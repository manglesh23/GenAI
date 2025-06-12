import express from 'express';
import { pdfParse } from '../controller/pdfParse.js';
const pdfParseRouter= express.Router();

pdfParseRouter.post('/pdfparse',pdfParse);

export default pdfParseRouter;