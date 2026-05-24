/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState }
from 'react';

import axios
from 'axios';

import Link
from 'next/link';

import GeneratedPaper
from '@/components/GeneratedPaper';

import { useAssignmentStore }
from '@/store/useAssignmentStore';

import { saveAssignment }
from '@/utils/localStorage';

export default function CreatePage() {

  const {
    generatedData,
    setGeneratedData,
  } = useAssignmentStore();

  const [
    file,
    setFile,
  ] = useState<File | null>(
    null
  );

  const [
    title,
    setTitle,
  ] = useState('');

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    dueDate,
    setDueDate,
  ] = useState('');

  const [
    instructions,
    setInstructions,
  ] = useState('');

  const [
    questionTypes,
    setQuestionTypes,
  ] = useState([

    {
      type: 'MCQ',
      questions: 10,
      marks: 1,
    },

    {
      type:
        'Short Questions',

      questions: 5,

      marks: 3,
    },

    {
      type:
        'Long Questions',

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

        for (
          const q
          of questionTypes
        ) {

          if (
            Number(q.questions) <= 0
          ) {

            alert(
              'Questions must be greater than 0'
            );

            return;

          }

          if (
            Number(q.marks) <= 0
          ) {

            alert(
              'Marks must be greater than 0'
            );

            return;

          }

        }

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          'file',
          file
        );

        formData.append(
          'title',
          title
        );

        formData.append(
          'dueDate',
          dueDate
        );

        formData.append(
          'instructions',
          instructions
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
            formData

          );

        setGeneratedData(
          response.data
        );

        saveAssignment(
          response.data
        );

      } catch (error: any) {

        console.error(error);

        alert(

          error?.response
            ?.data?.message ||

          'Generation failed'

        );

      } finally {

        setLoading(false);

      }

    };

  const totalQuestions =
    questionTypes.reduce(

      (
        acc,
        q
      ) =>

        acc +
        Number(q.questions),

      0

    );

  const totalMarks =
    questionTypes.reduce(

      (
        acc,
        q
      ) =>

        acc +
        (
          Number(
            q.questions
          ) *
          Number(
            q.marks
          )
        ),

      0

    );

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-4
        md:p-10
      "
    >

      {loading && (

        <div
          className="
            fixed
            inset-0
            bg-black/40
            flex
            items-center
            justify-center
            z-50
          "
        >

          <div
            className="
              bg-white
              px-8
              py-5
              rounded-2xl
              font-semibold
            "
          >

            Generating Assignment...

          </div>

        </div>

      )}

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
            md:text-4xl
            font-bold
          "
        >

          Create Assignment

        </h1>

        <p
          className="
            text-gray-500
            mt-3
          "
        >

          Create AI-powered
          examination papers

        </p>

        <div
          className="
            mt-10
            border-2
            border-dashed
            rounded-3xl
            p-10
            text-center
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

            Choose PDF or drag
            & drop here

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
              "
            >

              Selected:
              {' '}
              {file.name}

            </p>

          )}

        </div>

        <div className="mt-8">

          <label
            className="
              font-semibold
              block
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
              AI End Semester Exam
            "

            className="
              w-full
              border
              rounded-xl
              p-4
            "

          />

        </div>

        <div className="mt-6">

          <label
            className="
              font-semibold
              block
              mb-2
            "
          >

            Due Date

          </label>

          <input

            type="date"

            value={dueDate}

            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }

            className="
              w-full
              border
              rounded-xl
              p-4
            "

          />

        </div>

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

        <div className="mt-6">

          <label
            className="
              font-semibold
              block
              mb-2
            "
          >

            Additional Instructions

          </label>

          <textarea

            value={instructions}

            onChange={(e) =>
              setInstructions(
                e.target.value
              )
            }

            rows={4}

            placeholder="
              Example:
              Generate
              application-based
              questions only
            "

            className="
              w-full
              border
              rounded-xl
              p-4
            "

          />

        </div>

        <div
          className="
            flex
            justify-end
            gap-10
            mt-10
            font-bold
          "
        >

          <p>

            Questions:
            {' '}
            {totalQuestions}

          </p>

          <p>

            Marks:
            {' '}
            {totalMarks}

          </p>

        </div>

        <button

          onClick={
            handleGenerate
          }

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