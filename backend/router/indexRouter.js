// const express=require('express');
// const chatModelRouter = require('./chatModelRouter');
// const router= express.Router();

// router.use('/chat',chatModelRouter);

// module.exports=router;
import express from 'express';
import chatModelRouter from './chatModelRouter.js';
import ollamaRouter from './ollamaRouter.js';
import embeddRouter from './embeddRouter.js';
import geminiRouter from './geminiRouter.js';
import pdfParseRouter from './pdfParseRouter.js';

const router = express.Router();

router.use('/chat', chatModelRouter);
router.use('/ollama',ollamaRouter);
router.use('/embedd',embeddRouter);
router.use('/gemini',geminiRouter);
router.use('/pdf',pdfParseRouter);

export default router;
