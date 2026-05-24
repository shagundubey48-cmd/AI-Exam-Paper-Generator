'use client';

import { useState } from 'react';

import axios from 'axios';

import Link from 'next/link';

import GeneratedPaper
from '@/components/GeneratedPaper';

export default function CreatePage() {

  const [file, setFile] =
    useState<File | null>(null);

  const [title, setTitle] =
    useState('');

  const [generatedData, setGeneratedData] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  const [questionTypes, setQuestionTypes] =
    useState([

      {
        type: 'MCQ',
        questions: 10,
        marks: 1,
      },

      {
        type: 'Short Questions',
        questions: 5,
        marks: 3,
      },

      {
        type: 'Long Questions',
        questions: 3,
        marks: 5,
      },

    ]);

  const handleGenerate =
    async () => {

      try {

        if (!file) {

          alert(
            'Please upload PDF'
          );

          return;

        }

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          'pdf',
          file
        );

        formData.append(
          'title',
          title
        );

        formData.append(

          'questionTypes',

          JSON.stringify(
            questionTypes
          )

        );

        const response =
          await axios.post(

            `${process.env.NEXT_PUBLIC_API_URL}/api/assignments/generate`,

            formData,

            {

              headers: {

                'Content-Type':
                  'multipart/form-data',

              },

            }

          );

        setGeneratedData(
          response.data
        );

      } catch (error) {

        console.error(error);

        alert(
          'Generation failed'
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-6
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
          bg-white
          rounded-3xl
          p-8
        "
      >

        <Link href="/assignments">

          <button
            className="
              border
              px-6
              py-3
              rounded-2xl
              font-semibold
              mb-10
            "
          >

            View Assignments

          </button>

        </Link>

        <h1
          className="
            text-5xl
            font-bold
          "
        >

          Create Assignment

        </h1>

        <p
          className="
            mt-4
            text-gray-500
            text-xl
          "
        >

          Create AI-powered
          examination papers

        </p>

        {/* FILE */}

        <div className="mt-10">

          <input

            type="file"

            accept=".pdf"

            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );

              }

            }}

            className="
              w-full
              border
              rounded-2xl
              p-4
              bg-white
            "

          />

        </div>

        {/* TITLE */}

        <input

          type="text"

          placeholder="Assignment Title"

          value={title}

          onChange={(e) =>
            setTitle(
              e.target.value
            )
          }

          className="
            mt-8
            w-full
            border
            rounded-2xl
            p-4
          "

        />

        {/* QUESTION TYPES */}

        <div
          className="
            mt-10
            space-y-4
          "
        >

          {questionTypes.map(

            (
              q,
              index
            ) => (

              <div
                key={index}
                className="
                  grid
                  grid-cols-3
                  gap-4
                "
              >

                <input

                  value={q.type}

                  onChange={(e) => {

                    const updated =
                      [...questionTypes];

                    updated[index].type =
                      e.target.value;

                    setQuestionTypes(
                      updated
                    );

                  }}

                  className="
                    border
                    rounded-xl
                    p-4
                  "

                />

                <input

                  type="number"

                  value={q.questions}

                  onChange={(e) => {

                    const updated =
                      [...questionTypes];

                    updated[index].questions =
                      Number(
                        e.target.value
                      );

                    setQuestionTypes(
                      updated
                    );

                  }}

                  className="
                    border
                    rounded-xl
                    p-4
                  "

                />

                <input

                  type="number"

                  value={q.marks}

                  onChange={(e) => {

                    const updated =
                      [...questionTypes];

                    updated[index].marks =
                      Number(
                        e.target.value
                      );

                    setQuestionTypes(
                      updated
                    );

                  }}

                  className="
                    border
                    rounded-xl
                    p-4
                  "

                />

              </div>

            )

          )}

        </div>

        {/* BUTTON */}

        <button

          onClick={handleGenerate}

          disabled={loading}

          className="
            mt-10
            bg-black
            text-white
            px-8
            py-4
            rounded-2xl
            font-semibold
          "

        >

          {

            loading

              ? 'Generating...'

              : 'Generate Assignment'

          }

        </button>

      </div>

      {/* GENERATED PAPER */}

      {generatedData && (

        <GeneratedPaper
          generatedData={
            generatedData
          }
        />

      )}

    </div>

  );

}