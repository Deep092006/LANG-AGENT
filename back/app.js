// ⚙️ Environment Setup
import { configDotenv } from "dotenv";
configDotenv();

// 🧠 Import AI Model
import { Chatmodel } from "./utils/Llm.js";

// 🌐 LangChain Imports
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { AIMessage, createAgent, tool } from "langchain";
import * as z from "zod";

// 🚀 Express Server Setup
import express from "express";
const app = express();

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});

// 📚 Initialize Wikipedia Tool
const wikiQuery = new WikipediaQueryRun({
  topKResults: 3,              // 🔢 Number of top results to fetch
  maxDocContentLength: 4000,   // 📄 Max document length
});

// 🧩 Define Wiki Fetch Function
const fetchWikiArticle = async ({ query }) => {
  return await wikiQuery.invoke(query);
};

// 🔍 Register Wikipedia Tool
const wikiTool = tool(fetchWikiArticle, {
  name: "get_article",                          // 🏷️ Tool name
  description: "Get a Wikipedia article based on a query", // 📝 Tool description
  schema: z.object({
    query: z.string().describe("Name of article"), // 🧾 Input schema
  }),
});

// 🌦️ Define Weather Tool
const weatherTool = tool(
  ({ location }) => `Weather in ${location}: ☀️ Sunny, 72°F`,
  {
    name: "get_weather",                      // 🏷️ Tool name
    description: "Get weather information for a location", // 📝 Tool description
    schema: z.object({
      location: z.string().describe("Location to get weather for"), // 🧾 Input schema
    }),
  }
);

// 🤖 Create AI Agent
const agent = createAgent({
  model: Chatmodel,
  tools: [wikiTool, weatherTool],  // 🧰 Attach tools
});

// 💬 Query the Agent
const responseStream = await agent.stream({
  messages: [
    {
      role: "user", // 👤 User role
      content: "Who is Mark Zuckerberg?",
    },
  ],
});

// 🔄 Stream and Handle Responses
for await (const chunk of responseStream) {
  if (chunk.tools) {
    // 🛠️ Tool-related output (optional)
    console.log("Tool Output:", chunk.tools);
  } else {
    // 🧠 AI model response (optional)
    console.log("AI Response:", chunk.model_request);
  }
}
