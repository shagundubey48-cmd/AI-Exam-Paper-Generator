/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Request,
  Response
} from 'express';

interface MulterRequest
  extends Request {

  file?: any;

}

import fs from 'fs';

const pdfParse =
  require('pdf-parse');

import Groq from 'groq-sdk';

const groq =
  new Groq({

    apiKey:
      process.env.GROQ_API_KEY,

  });

export const generateAssignment =
  async (

    req: MulterRequest,

    res: Response

  ) => {

    try {

      if (!req.file) {

        return res.status(400).json({

          message:
            'PDF file required',

        });

      }

      const pdfBuffer =
        fs.readFileSync(
          req.file.path
        );

      const pdfData =
        await pdfParse(
          pdfBuffer
        );

      const extractedText =
        pdfData.text
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .slice(0, 3000);

      const {
        title,
        questionTypes,
        dueDate,
        instructions,
      } = req.body;

      const parsedQuestionTypes =
        JSON.parse(
          questionTypes
        );

      const totalQuestions =
        parsedQuestionTypes.reduce(

          (
            acc: number,
            q: any
          ) =>

            acc +
            Number(q.questions),

          0

        );

      const totalMarks =
        parsedQuestionTypes.reduce(

          (
            acc: number,
            q: any
          ) =>

            acc +
            (
              Number(q.questions) *
              Number(q.marks)
            ),

          0

        );

      const prompt = `

You are an expert school exam paper setter.

Generate a PROFESSIONAL exam paper.

TOPIC CONTENT:
${extractedText}

QUESTION REQUIREMENTS:
${parsedQuestionTypes
  .map(
    (q: any) =>

      `${q.questions} ${q.type}
      questions of ${q.marks}
      marks each`
  )
  .join('\n')}

DUE DATE:
${dueDate}

ADDITIONAL INSTRUCTIONS:
${instructions}

STRICT RULES:

1. Generate ONLY meaningful questions.
2. Do NOT copy notes directly.
3. MCQs MUST contain:
   - question
   - 4 options
   - correct answer
4. Short questions should be conceptual.
5. Long questions should be descriptive.
6. Return ONLY valid JSON.
7. Generate REAL questions from the study material.
8. NEVER use placeholders like:
   - MCQ Question 1
   - Short Question 1
   - Long Question 1
9. EVERY question must be unique and topic-related.
10. EVERY question MUST include a detailed answer.
11. NO markdown.
12. NO explanations.

JSON FORMAT:

{
  "schoolName": "Delhi Public School",

  "subject": "Artificial Intelligence",

  "time": "3 Hours",

  "maxMarks": ${totalMarks},

  "sections": [

    {
      "title": "SECTION A — MCQ",

      "instruction": "Attempt all questions",

      "questions": [

        {
          "question": "",

          "difficulty": "Easy",

          "marks": 1,

          "options": [
            "",
            "",
            "",
            ""
          ],

          "answer": ""
        }

      ]
    },

    {
      "title": "SECTION B — Short Questions",

      "instruction": "Attempt all questions",

      "questions": [

        {
          "question": "",

          "difficulty": "Medium",

          "marks": 3,

          "answer": ""
        }

      ]
    },

    {
      "title": "SECTION C — Long Questions",

      "instruction": "Attempt all questions",

      "questions": [

        {
          "question": "",

          "difficulty": "Hard",

          "marks": 5,

          "answer": ""
        }

      ]
    }

  ]
}

`;


      const completion =
        await groq.chat.completions.create({

          model:
            'llama-3.3-70b-versatile',

          messages: [

            {
              role: 'user',
              content: prompt,
            },

          ],

          temperature: 0.2,

          response_format: {
            type: 'json_object',
          },

        });


      const aiText =
        completion.choices[0]
          ?.message?.content || '';


      const cleaned =
        aiText

          .replace(
            /```json/g,
            ''
          )

          .replace(
            /```/g,
            ''
          )

          .replace(
            /Here is the generated exam paper in JSON format:/gi,
            ''
          )

          .replace(
            /Here is your JSON:/gi,
            ''
          )

          .replace(
            /Here is the JSON output:/gi,
            ''
          )

          .trim();

      let parsed: any;

try {

  parsed =
    JSON.parse(cleaned);

  if (

    !parsed.sections ||

    !Array.isArray(
      parsed.sections
    ) ||

    parsed.sections.length === 0

  ) {

    console.log(
      'FORCING FALLBACK SECTIONS'
    );

    parsed.sections =

      parsedQuestionTypes.map(

        (
          q: any,
          index: number
        ) => ({

          title:
            `SECTION ${
              String.fromCharCode(
                65 + index
              )
            } — ${q.type}`,

          instruction:
            'Attempt all questions',

          questions:
            Array.from(

              {
                length:
                  Number(
                    q.questions
                  ),
              },

              (_, i) => ({

                question:
                  `${q.type} Question ${i + 1}`,

                difficulty:
                  i % 3 === 0
                    ? 'Easy'
                    : i % 3 === 1
                    ? 'Medium'
                    : 'Hard',

                marks:
                  Number(
                    q.marks
                  ),

                options:

                  q.type ===
                  'MCQ'

                    ? [

                        'Option A',

                        'Option B',

                        'Option C',

                        'Option D',

                      ]

                    : undefined,

                answer:
                  'Generated answer',

              })

            ),

        })

      );

  }

  console.log(
    'FINAL SECTION COUNT:',
    parsed.sections.length
  );

  console.log(
    'JSON PARSED SUCCESSFULLY'
  );

} catch (jsonError) {

  console.log(
    'JSON PARSE FAILED'
  );

  parsed = {

    title,

    subject:
      extractedText
        .slice(0, 50) ||

      'Subject',

    totalQuestions:
      parsedQuestionTypes.reduce(

        (
          sum: number,
          q: any
        ) =>

          sum +
          Number(
            q.questions
          ),

        0

      ),

    totalMarks:
      parsedQuestionTypes.reduce(

        (
          sum: number,
          q: any
        ) =>

          sum +
          (
            Number(
              q.questions
            ) *

            Number(
              q.marks
            )
          ),

        0

      ),

    schoolName:
      'Delhi Public School',

    time:
      '3 Hours',

    maxMarks:
      parsedQuestionTypes.reduce(

        (
          sum: number,
          q: any
        ) =>

          sum +
          (
            Number(
              q.questions
            ) *

            Number(
              q.marks
            )
          ),

        0

      ),

    sections:

      parsedQuestionTypes.map(

        (
          q: any,
          index: number
        ) => ({

          title:
            `SECTION ${
              String.fromCharCode(
                65 + index
              )
            } — ${q.type}`,

          instruction:
            'Attempt all questions',

          questions:
            Array.from(

              {
                length:
                  Number(
                    q.questions
                  ),
              },

              (_, i) => ({

                question:
                  `${q.type} Question ${i + 1}`,

                difficulty:
                  i % 3 === 0
                    ? 'Easy'
                    : i % 3 === 1
                    ? 'Medium'
                    : 'Hard',

                marks:
                  Number(
                    q.marks
                  ),

                options:

                  q.type ===
                  'MCQ'

                    ? [

                        'Option A',

                        'Option B',

                        'Option C',

                        'Option D',

                      ]

                    : undefined,

                answer:
                  'Generated answer',

              })

            ),

        })

      ),

  };

}
   
      console.log(
  'FINAL SECTIONS:',
  parsed.sections.length
);
console.log(
  'SECTIONS VALUE:',
  parsed.sections
);

console.log(
  'SECTIONS LENGTH:',
  parsed.sections?.length
);

      return res.json({

        title,

        subject:
  parsed.subject ||
  'Artificial Intelligence',

        totalQuestions,

        totalMarks,

        schoolName:
  parsed.schoolName ||
  'Delhi Public School',

        time:
  parsed.time ||
  '3 Hours',

        maxMarks:
  parsed.maxMarks ||
  totalMarks,

        sections:

  parsed.sections &&
  parsed.sections.length > 0

    ? parsed.sections

    : parsedQuestionTypes.map(

        (
          q: any,
          index: number
        ) => ({

          title:
            `SECTION ${
              String.fromCharCode(
                65 + index
              )
            } — ${q.type}`,

          instruction:
            'Attempt all questions',

          questions:
            Array.from(

              {
                length:
                  Number(
                    q.questions
                  ),
              },

              (_, i) => ({

                question:
                  `${q.type} Question ${i + 1}`,

                difficulty:
                  i % 3 === 0
                    ? 'Easy'
                    : i % 3 === 1
                    ? 'Medium'
                    : 'Hard',

                marks:
                  Number(
                    q.marks
                  ),

                options:

                  q.type ===
                  'MCQ'

                    ? [

                        'Option A',

                        'Option B',

                        'Option C',

                        'Option D',

                      ]

                    : undefined,

                answer:
                  'Generated answer',

              })

            ),

        })

      ),
          

      });

    } catch (error: any) {
      console.error(error);

      return res.status(500).json({

        message:
          'Generation failed',

        error:
          error?.message,

      });

    }

  };