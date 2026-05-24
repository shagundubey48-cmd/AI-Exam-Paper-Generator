import express
from 'express';

import cors
from 'cors';

import dotenv
from 'dotenv';

dotenv.config();

import assignmentRoutes
from './routes/assignment.routes';

const app =
  express();

app.use(cors());

app.use(
  express.json()
);

app.use(

  '/api/assignments',

  assignmentRoutes

);

app.listen(

  5000,

  () => {

    console.log(
      'Server running on 5000'
    );

  }

);