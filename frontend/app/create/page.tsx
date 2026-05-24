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

        if (!title.trim()) {

          alert(
            'Please enter title'
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

        const API_URL =

          process.env
            .NEXT_PUBLIC_API_URL ||

          'http://localhost:5000';

        const response =
          await axios.post(

            `${API_URL}/api/assignments/generate`,

            formData,

            {

              headers: {

                'Content-Type':
                  'multipart/form-data',

              },

            }

          );

        console.log(
          response.data
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
        p-4
        md:p-10
      "
    >

      <div
        className="
          max-w-6xl
          mx-auto
          bg-white
          rounded-3xl
          shadow-sm
          p-6
          md:p-10
        "
      >

        <Link href="/assignments">

          <button
            className="
              mb-8
              border
              px-5
              py-2
              rounded-xl
              hover:bg-black
              hover:text-white
              transition
            "
          >

            View Assignments

          </button>

        </Link>

        <h1
          className="
            text-2xl
            md:text-5xl
            font-bold
          "
        >

          Create Assignment

        </h1>

        <p
          className="
            mt-3
            text-gray-500
            text-lg
          "
        >

          Create AI-powered
          examination papers

        </p>

        {/* PDF Upload */}

        <div
          className="
            mt-10
            border-2
            border-dashed
            rounded-3xl
            p-10
            text-center
            bg-gray-50
          "
        >

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Upload PDF

          </h2>

          <p
            className="
              mt-3
              text-gray-500
            "
          >

            Choose PDF file

          </p>

          <input

            type="file"

            accept=".pdf"

            onChange={(e) =>

              setFile(

                e.target.files?.[0] ||

                null

              )

            }

            className="
              mt-6
            "

          />

          {file && (

            <p
              className="
                mt-4
                text-sm
                font-medium
              "
            >

              Selected:
              {' '}
              {file.name}

            </p>

          )}

        </div>

        {/* Title */}

        <div className="mt-8">

          <label
            className="
              block
              font-semibold
              mb-2
            "
          >

            Assignment Title

          </label>

          <input

            type="text"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            placeholder="
              AI Mid Semester Exam
            "

            className="
              w-full
              border
              rounded-xl
              p-4
            "

          />

        </div>

        {/* Question Types */}

        <div className="mt-10">

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Question Types

          </h2>

          <div className="mt-6 space-y-5">

            {questionTypes.map(

              (
                q,
                index
              ) => (

                <div

                  key={index}

                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                  "

                >

                  <input

                    type="text"

                    value={q.type}

                    onChange={(e) => {

                      const updated =
                        [
                          ...questionTypes,
                        ];

                      updated[
                        index
                      ].type =
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

                    value={
                      q.questions
                    }

                    onChange={(e) => {

                      const updated =
                        [
                          ...questionTypes,
                        ];

                      updated[
                        index
                      ].questions =

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
                        [
                          ...questionTypes,
                        ];

                      updated[
                        index
                      ].marks =

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

        </div>

        {/* Generate Button */}

        <button

          onClick={
            handleGenerate
          }

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

      {/* Generated Paper */}

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