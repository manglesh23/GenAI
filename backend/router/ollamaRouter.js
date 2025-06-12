import express from 'express'
import { ollamaChatController } from '../controller/chatOllama.js';

const ollamaRouter= express.Router();
ollamaRouter.post('/ollamaChatModel',ollamaChatController);

export default ollamaRouter;