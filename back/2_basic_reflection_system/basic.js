// ─────────────────────────────────────────────────────────────
// 🧠 Imports
// ─────────────────────────────────────────────────────────────
import { END, MessageGraph } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { generateTweet, refineTweet } from "./chain.js";
// ─────────────────────────────────────────────────────────────
// ⚙️ Graph Nodes Setup
// ─────────────────────────────────────────────────────────────
const GENERATE = "generate";
const REFLECT = "reflect";

const graph = new MessageGraph();

// ✅ Define Nodes
graph.addNode(GENERATE, generateTweet);
graph.addNode(REFLECT, refineTweet);

// ✅ Define Edges (Flow)
const iscontinue = async (state) => {
  if (state.length > 4) {
    console.log("state \n \n \n",state)
    
    return END
  }

  else{
    return REFLECT
  }
}
graph.addConditionalEdges(GENERATE,iscontinue );
graph.addEdge(REFLECT, GENERATE);

// ✅ Define Entry Point (very important!)
graph.setEntryPoint(GENERATE);

// ─────────────────────────────────────────────────────────────
// 🚀 Compile & Visualize Graph
// ─────────────────────────────────────────────────────────────
const compiledGraph = graph.compile();

console.log(compiledGraph.getGraph().drawMermaid());

// ─────────────────────────────────────────────────────────────
// 🧪 Test Run (optional)
// ─────────────────────────────────────────────────────────────
  const result =await compiledGraph.stream(
  new HumanMessage("Write a tweet about dsa vs ai vs dev")
  )

  for await (const chunk of result) {
 console.log(chunk);
 
}