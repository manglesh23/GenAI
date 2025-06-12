import fs from "fs";
import path from "path";

// import pdf from "pdf-parse";
import { fileURLToPath } from "url";


export const pdfParse = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const folderPath = path.join(__dirname, "./documents");
  const files = fs.readdirSync(folderPath);
  console.log(files);

  let pathtoFle = path.join(folderPath, files[0]);
  const pdfBuffer = fs.readFileSync(pathtoFle);

  // Load PDF document
  const loadingTask = pdfjsLib.getDocument({ data: pdfBuffer });
  const pdfDocument = await loadingTask.promise;

  let fullText = "";

  // Loop through all pages and extract text
  for (let i = 1; i <= pdfDocument.numPages; i++) {
    const page = await pdfDocument.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n\n";
  }

  res.status(200).json({ msg: fullText });
};
