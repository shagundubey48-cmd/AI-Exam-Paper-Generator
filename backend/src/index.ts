import dotenv from 'dotenv';

dotenv.config();

import express from 'express';

import cors from 'cors';

import assignmentRoutes from './routes/assignment.routes';

import { connectDB } from './config/db';

const app = express();

//connectDB();

app.use(cors());

app.use(express.json());

app.use(
  '/api/assignment',
  assignmentRoutes
);

app.listen(5000, () => {

  console.log('Server running on 5000');

});