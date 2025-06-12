// const express=require('express');
// const { huggingFaceChatInference } = require('../controller/huggingFaceChatInference');
import express from 'express';
import { huggingFaceChatInference } from '../controller/huggingFaceChatInference.js';
const chatModelRouter= express.Router();

chatModelRouter.post('/chatmodel',huggingFaceChatInference);

export default chatModelRouter;