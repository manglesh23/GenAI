import express from 'express';
import { embeddingModel } from '../controller/embeddingModel.js';
const embeddRouter= express.Router();
embeddRouter.post('/embedd',embeddingModel);

export default embeddRouter

