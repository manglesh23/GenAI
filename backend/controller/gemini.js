import { GoogleGenerativeAI } from "@google/generative-ai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

export const gemini = async (req, res) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  //   let models=await genAI.listModels();
  //   console.log(models);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const __filename = fileURLToPath(import.meta.url);
  console.log("file name:-", __filename);
  const __dirname = path.dirname(__filename);

  console.log("__dirname:", __dirname);
  const folderPath = path.join(__dirname, "./documents");
  console.log(folderPath);

  const files = fs.readdirSync(folderPath);
  console.log(files);

  let allDocs = [];

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const loader = new PDFLoader(fullPath);
    const docs = await loader.load();
    //   console.log("Docs:-",docs)
    allDocs.push(...docs);
  }

  //   console.log(allDocs)
  const contextText = allDocs.map((doc) => doc.pageContent).join("\n\n");

  // Split all into chunks

  //   const splitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 2000,
  //     chunkOverlap: 20,
  //   });
  //   const splitDocs = await splitter.splitDocuments(allDocs);
  // console.log(splitDocs)
  //   console.log("Doc Split:-",splitDocs);

  //   const vectorStore = await Chroma.fromDocuments(
  //     splitDocs,
  //     new GoogleGenerativeAIEmbeddings({
  //       apiKey: process.env.GEMINI_API_KEY,
  //       model: "embedding-001",
  //     }),
  //     {
  //       collectionName: "rag-test",
  //     }
  //   );

  //   const relevantChunks = splitDocs.filter((chunk) =>
  //     chunk.pageContent.toLowerCase().includes("Committee")
  //   );

  // console.log("chunk:-",relevantChunks[0].pageContent)
  let userquestion = req.body.user_question;
const prompt = `You are an AI assistant. Answer the following question based on the provided context.
Context: ${contextText} Question: ${userquestion}
Instructions:
- First, search for the answer strictly within the context.
- If not found, use your own knowledge and add [Model Knowledge] before your response.
- If the answer is not found in the context, DO NOT hesitate to use your own general knowledge..
- If you must rely on your own understanding, do so clearly and confidently..
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  res.json({ result: response.text() });
};
