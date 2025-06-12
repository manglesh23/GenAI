import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './router/indexRouter.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(8000, () => {
  console.log("🚀 Server is listening on http://localhost:8000");
});
