import * as dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";

// import { Chroma } from "langchain/vectorstores/chroma";
// import { Chroma } from "langchain/vectorstores";
import { Chroma } from "@langchain/community/vectorstores/chroma";

// import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { OllamaEmbeddings } from "@langchain/community/embeddings/ollama";
// import { OllamaEmbeddings } from "langchain/embeddings/ollama";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// Loaders
// import { TextLoader } from "langchain/document_loaders/fs/text";
// import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { fileURLToPath } from "url";

// import { CSVLoader } from "langchain/document_loaders/fs/csv";

// Helper: Get loader based on file extension
function getLoader(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case ".txt":
      return new TextLoader(filePath);
    case ".pdf":
      return new PDFLoader(filePath); //Loader initilize
    case ".csv":
      return new CSVLoader(filePath);
    default:
      throw new Error(`Unsupported file type: ${ext}`);
  }
}

export const embeddingModel = async (req, res) => {
 
  try {
   
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log("__dirname:", __dirname);
    const folderPath = path.join(__dirname, "./documents");
    console.log(folderPath);

    const files = fs.readdirSync(folderPath);
    console.log(files);

    let allDocs = [];

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const loader = getLoader(fullPath);
      const docs = await loader.load();
    //   console.log("Docs:-",docs)
      allDocs.push(...docs);
    }

    // console.log(allDocs)

    // 2. Split all into chunks
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 20,
    });
    const splitDocs = await splitter.splitDocuments(allDocs);
    // console.log("doc split:-",splitDocs)

    // 3. Embed + store in Chroma
    // const vectorStore = await Chroma.fromDocuments(
    //   splitDocs,
    //   new OpenAIEmbeddings(),
    //   { collectionName: "my-mixed-docs" }
    // );

    // const vectorStore = await Chroma.fromDocuments(
    //   splitDocs,
    //   new OllamaEmbeddings({ model: "mistral" }),
    //   { collectionName: "my-mixed-docs" }
    // );
    // console.log(vectorStore);

    // 4. Query
    // const query = "What is Governor?";
    // const results = await vectorStore.similaritySearch(query, 3);

    // const retriever = vectorStore.asRetriever({ k: 3 });
    // const docs = await retriever.getRelevantDocuments(query);

    res.status(200).json({ msg: allDocs[0].metadata });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: e.message });
  }
};
