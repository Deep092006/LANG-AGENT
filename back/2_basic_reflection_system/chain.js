import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { ChatPromptValue } from "@langchain/core/prompt_values";
import { Chatmodel } from "../utils/Llm.js"; // 🚀 Pre-configured LLM instance (Google/ChatGPT, etc.)
import { AIMessage, HumanMessage } from "langchain";
import { configDotenv } from "dotenv";
import * as z from "zod";
configDotenv();

// ─────────────────────────────────────────────────────────────
// 🧠 System Prompt Templates
// ─────────────────────────────────────────────────────────────

// 🎯 Prompt for initial tweet generation
const generateTweetPrompt = ChatPromptTemplate.fromMessages([
  {
    role: "system",
    content:
      "You are a Twitter tech influencer assistant tasked with writing excellent tweets. " +
      "Generate the most engaging, high-quality tweet possible for the user's request. " +
      "If the user gives suggestions or feedback, respond with a refined version of your previous attempts. " +
      "Return only the tweet text — no explanations or extra output.",
  },
  new MessagesPlaceholder("messages"),
]);

// 🧩 Prompt for tweet refinement (feedback + improvement)
const refineTweetPrompt = ChatPromptTemplate.fromMessages([
  {
    role: "system",
    content:
      "You are a viral Twitter influencer reviewing a tweet. " +
      "Provide clear, actionable feedback — no single-word or vague comments. " +
      "Focus on improving virality, tone, clarity, and engagement style. " +
      "Keep it concise, constructive, and avoid unnecessary text.",
  },
  new MessagesPlaceholder("messages"),
]);

// ─────────────────────────────────────────────────────────────
// ⚙️ Core Logic: Generation + Refinement
// ─────────────────────────────────────────────────────────────
const refine = z.object({
    focus: z.string().describe("The focus of the refinement."),
    hashtang: z.array(z.string()).describe("The hashtag of the post.."),
    suggetion: z.array(z.string()).describe("all post refinements suggetion"),
});
// 🪶 Step 1: Generate a tweet from user input
const gn = Chatmodel.withStructuredOutput(refine)
const gm = Chatmodel.withStructuredOutput(refine)
export const generateTweet = async (messages) => {
  const input = { messages };
  const promptValue = await generateTweetPrompt.formatPromptValue(input);
  const response = await Chatmodel.invoke(promptValue);
  return new AIMessage(response.content); // 🧠 LLM output as AI message
};

// 🔁 Step 2: Refine or review the tweet with actionable feedback
export const refineTweet = async (messages) => {
  console.log("called");

  const input = { messages };
  const promptValue = await refineTweetPrompt.formatPromptValue(input);

  const response = await gn.invoke(promptValue);
  console.log(response, "dcfc"); // logs structured object

  // Convert structured object into readable text
  const text = `Focus: ${response.focus}\nHashtags: ${response.hashtang.join(", ")}\nSuggestions:\n- ${response.suggetion.join("\n- ")}`;

  return new HumanMessage(text);
};

console.log(await refineTweet([
  new AIMessage("I love programming in JavaScript! #coding #JavaScript"),
]));
