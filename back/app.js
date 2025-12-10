// ⚙️ Environment Setup
import { configDotenv } from "dotenv";
configDotenv();
// 🧠 Import AI Model
import { Chatmodel } from "./utils/Llm.js";

// 🌐 LangChain Imports
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { AIMessage, createAgent, tool, toolStrategy } from "langchain";
import * as z from "zod";

// 🚀 Express Server Setup
import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}


app.get("/",async (req, res) => {
  main();
console.log(await Chatmodel.invoke("hello"));
  res.send("Hello, World!");
})
// // 📚 Initialize Wikipedia Tool
// const wikiQuery = new WikipediaQueryRun({
//   topKResults: 3,              // 🔢 Number of top results to fetch
//   maxDocContentLength: 4000,   // 📄 Max document length
// });

// // 🧩 Define Wiki Fetch Function
// const fetchWikiArticle = async ({ query }) => {
//   return await wikiQuery.invoke(query);
// };

// // 🔍 Register Wikipedia Tool
// const wikiTool = tool(fetchWikiArticle, {
//   name: "get_article",                          // 🏷️ Tool name
//   description: "Get a Wikipedia article based on a query", // 📝 Tool description
//   schema: z.object({
//     query: z.string().describe("Name of article"), // 🧾 Input schema
//   }),
// });

// // 🌦️ Define Weather Tool
// const weatherTool = tool(
//   ({ location }) => `Weather in ${location}: ☀️ Sunny, 72°F`,
//   {
//     name: "get_weather",                      // 🏷️ Tool name
//     description: "Get weather information for a location", // 📝 Tool description
//     schema: z.object({
//       location: z.string().describe("Location to get weather for"), // 🧾 Input schema
//     }),
//   }
// );

// const ProductReview = z.object({
//     rating: z.number().min(1).max(5),
//     sentiment: z.enum(["positive", "negative"]),
//     keyPoints: z.array(z.string()).describe("The key points of the review. Lowercase, 1-3 words each."),
// });

// // 🤖 Create AI Agent
// const agent = createAgent({
//   model: Chatmodel,
//   tools: [wikiTool, weatherTool],
//   responseFormat:toolStrategy(ProductReview),
//   maxOutputTokens: 200,
// });

// // 💬 Query the Agent
// const responseStream = await agent.stream({
//   messages: [
//     {
//       role: "user", // 👤 User role
//       content: "kgf",
//     },
//   ],
// });

// // 🔄 Stream and Handle Responses
// for await (const chunk of responseStream) {
//   if (chunk.tools) {
//     // 🛠️ Tool-related output (optional)
//     console.log("Tool Output:", chunk.tools);
//   } else {
//     // 🧠 AI model response (optional)
//     console.log("AI Response:", chunk.model_request);
//   }
// }