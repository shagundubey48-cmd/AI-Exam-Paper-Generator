import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

import assignmentRoutes from './routes/assignment.routes';
import { connectDB } from './config/db';

const app = express();

connectDB();

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.use('/api/assignment', assignmentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});