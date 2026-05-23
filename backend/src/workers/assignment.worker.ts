/* eslint-disable @typescript-eslint/no-explicit-any */

import { Worker }
from 'bullmq';

import mongoose
from 'mongoose';

import { redis }
from '../config/redis';

const Assignment =
  mongoose.models.Assignment;

if (
  Assignment
) {

  new Worker(

    'assignment-generation',

    async (job: any) => {

      try {

        const assignment =
          await Assignment.findById(

            job.data.assignmentId

          );

        if (!assignment) {

          return;

        }

        assignment.status =
          'processing';

        await assignment.save();

        assignment.generatedPaper = [

          {

            title:
              'Section A',

            instruction:
              'Attempt all questions',

            questions: [

              {

                text:
                  'Explain DBMS',

                difficulty:
                  'easy',

                marks: 2,

              },

            ],

          },

        ];

        assignment.status =
          'completed';

        await assignment.save();

      } catch (error) {

        console.error(error);

      }

    },

    {

      connection:
        redis,

    }

  );

}