import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';

//import connectDB from './config/db';
import assignmentRoutes from './routes/assignment.routes';
//import { initSocket } from './socket/socket';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//connectDB();

app.use('/api/assignments', assignmentRoutes);

const server = http.createServer(app);

//initSocket(server);

server.listen(5000, () => {
  console.log('Server running on port 5000');
});