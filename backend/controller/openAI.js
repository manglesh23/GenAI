import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAI } from "langchain/llms/openai";
import { ConversationalRetrievalQAChain } from "langchain/chains";
import fs from "fs";


export const openAI=async(req,res)=>{
const rawText = fs.readFileSync("notes.txt", "utf-8");
const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 50 });
const docs = await splitter.createDocuments([rawText]);


const vectorstore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings());


const model = new OpenAI({ temperature: 0 });


const chain = ConversationalRetrievalQAChain.fromLLM(model, vectorstore.asRetriever());


const res = await chain.invoke({
  question: "What is RAG?",
  chat_history: [],
});

console.log(res.text);
}