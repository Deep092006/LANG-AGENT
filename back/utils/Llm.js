import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {  configDotenv} from "dotenv";
configDotenv()

// 💬 Initialize Gemini chat model
export const Chatmodel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash", // 🧠 Model version
  maxOutputTokens: 2048,     // 🔢 Max tokens in response
});