// controller/chatOllama.js
// import { ChatOllama } from "langchain/chat_models/ollama";
import { ChatOllama } from "@langchain/community/chat_models/ollama";

import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";

export const ollamaChatController = async (req, res) => {
  try {
    const userInput = req.body.user_input;

    if (!userInput || typeof userInput !== "string") {
      return res.status(400).json({ msg: "Missing or invalid user_input" });
    }

    const model = new ChatOllama({
      baseUrl: "http://localhost:11434",
      model: "mistral",  //Model name
      temperature: 0.7,
    });

    const prompt = new PromptTemplate({
      inputVariables: ["user_input"],
      template: `You are a highly intelligent and helpful AI assistant. Answer with detailed reasoning and clarity.User: {user_input} Assistant:`,
    });

    const chain = new LLMChain({ llm: model, prompt });

    const response = await chain.call({ user_input: userInput });

    res.status(200).json({ msg: response.text });
  } catch (e) {
    console.error("❌ Error in ChatOllama:", e);
    res.status(500).json({ msg: "Internal Server Error", error: e.message });
  }
};
