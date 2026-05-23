/* eslint-disable @typescript-eslint/no-explicit-any */

import { Request, Response }
from 'express';

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
    req: Request,
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

      let parsed;

      try {

        parsed =
          JSON.parse(cleaned);

        console.log(
          'JSON PARSED SUCCESSFULLY'
        );

      } catch (jsonError) {

        console.log(
          'JSON PARSE FAILED'
        );

        console.log(jsonError);

        parsed = {

          schoolName:
            'Delhi Public School',

          subject:
            title ||
            'Artificial Intelligence',

          time:
            '3 Hours',

          maxMarks:
            totalMarks,

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
                        'Generated Question',

                      difficulty:
                        i % 3 === 0
                          ? 'Easy'
                          : i % 3 === 1
                          ? 'Moderate'
                          : 'Hard',

                      marks:
                        Number(
                          q.marks
                        ),

                      options:
                        q.type === 'MCQ'

                          ? [

                            'Option A',

                            'Option B',

                            'Option C',

                            'Option D',

                          ]

                          : [],

                      answer:
                        'Generated Answer',

                    })

                  ),

              })

            ),

        };

      }

      return res.json({

        title,

        subject:
          parsed.subject,

        totalQuestions,

        totalMarks,

        schoolName:
          parsed.schoolName,

        time:
          parsed.time,

        maxMarks:
          parsed.maxMarks,

        sections:
          parsed.sections,

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