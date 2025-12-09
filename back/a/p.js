// 📦 Run once before starting
// pnpm add langchain zod @langchain/google-genai @langchain/core langgraph dotenv

import { configDotenv } from "dotenv";
configDotenv();

import { z } from "zod";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { MessageGraph, END } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Chatmodel } from "../utils/Llm.js";

// =====================================================
// 🧠 Initialize Gemini Model
// =====================================================
const llm = Chatmodel

// =====================================================
// 🧩 Define Zod Schemas
// =====================================================
const Reflection = z.object({
  missing: z.string().describe("What details are missing?"),
  superfluous: z.string().describe("What is unnecessary?"),
});

const AnswerSchema = z.object({
  answer: z.string(),
  search_queries: z.array(z.string()),
  reflection: Reflection,
});

const RevisedAnswerSchema = AnswerSchema.extend({
  references: z.array(z.string()),
});

// =====================================================
// ✍️ Step 1 — Initial Draft Agent
// =====================================================
const draftPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a thoughtful AI assistant. Write a structured answer to the user's question.",
  ],
  ["human", "Question: {question}"],
]);

const draftAgent = RunnableSequence.from([
  draftPrompt,
  llm.withStructuredOutput(AnswerSchema),
]);

// =====================================================
// 🔍 Step 2 — Reflection Agent
// =====================================================
const reflectPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a critical reviewer. Analyze the given answer and suggest improvements.",
  ],
  ["human", "Answer: {answer}"],
]);

const reflectAgent = RunnableSequence.from([
  reflectPrompt,
  llm.withStructuredOutput(Reflection),
]);

// =====================================================
// 🧩 Step 3 — Revision Agent (No Tavily / No search)
// =====================================================
const revisePrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are an expert reviser. Improve the answer using the reflections and mock references.",
  ],
  new MessagesPlaceholder("input"),
]);

const reviseAgent = RunnableSequence.from([
  revisePrompt,
  llm.withStructuredOutput(RevisedAnswerSchema),
]);

// =====================================================
// 🕸️ Step 4 — Build LangGraph Flow
// =====================================================
const graph = new MessageGraph({ channels: { input: null } });

graph.addNode("draft", async (state) => {
  const result = await draftAgent.invoke({ question: state.input });
  return { draft: result };
});

graph.addNode("reflect", async (state) => {
  const result = await reflectAgent.invoke({ answer: state.draft.answer });
  return { reflection: result };
});
graph.setEntryPoint("draft"); 
// graph.addNode("revise", async (state) => {
//   const result = await reviseAgent.invoke({
//     input: [
//       {
//         role: "user",
//         content: `Previous answer:\n${state.draft.answer}\n\nReflection:\n${JSON.stringify(
//           state.reflection
//         )}`,
//       },
//     ],
//   });
//   return { revised: result };
// });

// // ➕ Define flow
graph.addEdge("draft", "reflect");
// graph.addEdge("reflect", "revise");
graph.addEdge("reflect", END);

// =====================================================
// 🚀 Step 5 — Run the pipeline
// =====================================================
const app = graph.compile()
console.log(app.getGraph().drawMermaid());

// const question =
//   "Explain how LangChain can be used to build multi-agent systems in JavaScript.";

// const result = await app.invoke({ input: question });

// console.log("\n🧠 Final Revised Answer:");
// console.log(result.revised.answer);

// console.log("\n🔗 Mock References:");
// console.log(result.revised.references);
