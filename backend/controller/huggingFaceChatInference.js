// const { HuggingFaceInference } = require("@langchain/community/llms/hf");
// const { PromptTemplate, LLMChain } = require("langchain");
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { PromptTemplate } from '@langchain/core/prompts';
// import { LLMChain } from '@langchain/core/chains';
import { LLMChain } from 'langchain/chains';


export const huggingFaceChatInference = async (req, res) => {
  try {
    let userInput=req.body.userInput;
    
    const model = new HuggingFaceInference({
      apiKey: process.env.HUGGINGFACE_API_KEY,
      model: "tiiuae/falcon-7b-instruct",

      maxRetries: 3,
      temperature: 0.7,
    });

    const prompt = new PromptTemplate({
      inputVariables: ["user_input"],
      template: `The following is a helpful conversation with an AI assistant.User: {user_input}Assistant:`,
    });

    const chain = new LLMChain({ llm: model, prompt });

    const response = await chain.call({
      user_input: userInput,
    });
    res.status(200).json({ msg: response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal Server Error",details:e });
  }
};

// module.exports = { huggingFaceChatInference };
