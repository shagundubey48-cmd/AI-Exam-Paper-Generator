/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useState } from 'react';

import jsPDF from 'jspdf';

import html2canvas from 'html2canvas';

export default function GeneratedPaper({
  generatedData,
}: any) {

  const [
    showAnswers,
    setShowAnswers,
  ] = useState(false);

  const downloadPDF =
    async () => {

      const input =
        document.getElementById(
          'paper-content'
        );

      if (!input) return;

      const canvas =
        await html2canvas(input, {

          scale: 2,

          useCORS: true,

        });

      const imgData =
        canvas.toDataURL(
          'image/png'
        );

      const pdf =
        new jsPDF({

          orientation:
            'portrait',

          unit: 'mm',

          format: 'a4',

        });

      const pdfWidth =
        210;

      const pdfHeight =
        297;

      const imgWidth =
        pdfWidth;

      const imgHeight =
        (
          canvas.height *
          imgWidth
        ) / canvas.width;

      let heightLeft =
        imgHeight;

      let position = 0;

      pdf.addImage(

        imgData,

        'PNG',

        0,

        position,

        imgWidth,

        imgHeight

      );

      heightLeft -=
        pdfHeight;

      while (
        heightLeft > 0
      ) {

        position =
          heightLeft -
          imgHeight;

        pdf.addPage();

        pdf.addImage(

          imgData,

          'PNG',

          0,

          position,

          imgWidth,

          imgHeight

        );

        heightLeft -=
          pdfHeight;

      }

      pdf.save(
        'assignment.pdf'
      );

    };

  if (!generatedData) {

    return null;

  }

  return (

    <div className="mt-10">

      <div
        className="
          sticky
          top-4
          z-50
          flex
          justify-end
          gap-4
          mb-6
        "
      >

        <button

          onClick={downloadPDF}

          className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "

        >

          Download PDF

        </button>

        <button

          onClick={() =>
            setShowAnswers(
              !showAnswers
            )
          }

          className="
            bg-gray-200
            text-black
            px-6
            py-3
            rounded-xl
            font-semibold
            shadow-lg
          "

        >

          {

            showAnswers

              ? 'Hide Answer Key'

              : 'View Answer Key'

          }

        </button>

      </div>

      {/* PRINTABLE CONTENT */}

      <div
        id="paper-content"
        className="
          bg-white
          rounded-3xl
          p-6
          md:p-12
          overflow-visible
        "
      >

        <div className="text-center">

          <h1
            className="
              text-4xl
              font-bold
            "
          >

            {
              generatedData.schoolName
            }

          </h1>

          <p className="mt-4 text-lg">

            Subject:
            {' '}
            {
              generatedData.subject
            }

          </p>

          <p className="mt-2">

            Class:
            {' '}
            10th

          </p>

        </div>

        <div
          className="
            flex
            justify-between
            mt-12
            text-lg
          "
        >

          <div>

            Time Allowed:
            {' '}
            {
              generatedData.time
            }

          </div>

          <div>

            Maximum Marks:
            {' '}
            {
              generatedData.maxMarks
            }

          </div>

        </div>

        <div className="mt-14 space-y-4">

          <div className="flex gap-4">

            <span className="font-semibold">

              Name:

            </span>

            <div
              className="
                border-b
                border-black
                w-[300px]
              "
            />

          </div>

          <div className="flex gap-4">

            <span className="font-semibold">

              Roll Number:

            </span>

            <div
              className="
                border-b
                border-black
                w-[200px]
              "
            />

          </div>

          <div className="flex gap-4">

            <span className="font-semibold">

              Section:

            </span>

            <div
              className="
                border-b
                border-black
                w-[150px]
              "
            />

          </div>

        </div>

        <div className="mt-14">

          <h2
            className="
              text-2xl
              font-bold
            "
          >

            Instructions

          </h2>

          <ul
            className="
              mt-5
              space-y-3
              list-disc
              pl-6
            "
          >

            <li>
              All questions are compulsory.
            </li>

            <li>
              Read all questions carefully.
            </li>

            <li>
              Maintain neat presentation.
            </li>

          </ul>

        </div>

        <div className="mt-16 space-y-16">

          {generatedData.sections?.map(

            (
              section: any,
              sectionIndex: number
            ) => (

              <div key={sectionIndex}>

                <div className="text-center">

                  <h2
                    className="
                      text-3xl
                      font-bold
                      uppercase
                    "
                  >

                    {
                      section.title
                    }

                  </h2>

                  <p className="mt-3 text-gray-500">

                    {
                      section.instruction
                    }

                  </p>

                </div>

                <div className="mt-12 space-y-8">

                  {section.questions?.map(

                    (
                      q: any,
                      qIndex: number
                    ) => (

                      <div
                        key={qIndex}
                        className="
                          border
                          border-gray-200
                          rounded-2xl
                          p-8
                          bg-white
                          shadow-sm
                        "
                      >

                        <div
                          className="
                            flex
                            justify-between
                            gap-10
                          "
                        >

                          <div className="flex-1">

                            <h3
                              className="
                                text-lg
                                font-semibold
                              "
                            >

                              {qIndex + 1}.
                              {' '}
                              {q.question}

                            </h3>

                          </div>

                          <div
                            className="
                              text-right
                              min-w-[120px]
                            "
                          >

                            <div
                              className="
                                bg-gray-100
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                inline-block
                              "
                            >

                              {
                                q.difficulty
                              }

                            </div>

                            <p
                              className="
                                mt-3
                                font-bold
                              "
                            >

                              {q.marks}
                              {' '}
                              Marks

                            </p>

                          </div>

                        </div>

                        {q.options && (

                          <div
                            className="
                              grid
                              md:grid-cols-2
                              gap-4
                              mt-8
                            "
                          >

                            {q.options.map(

                              (
                                option: string,
                                optionIndex: number
                              ) => (

                                <div
                                  key={optionIndex}
                                  className="
                                    border
                                    rounded-xl
                                    p-4
                                  "
                                >

                                  <span className="font-bold">

                                    {
                                      String.fromCharCode(
                                        65 +
                                        optionIndex
                                      )
                                    }.

                                  </span>

                                  {' '}
                                  {option}

                                </div>

                              )

                            )}

                          </div>

                        )}

                        {!q.options && (

                          <div
                            className="
                              mt-8
                              min-h-[120px]
                              border
                              border-dashed
                              border-gray-300
                              rounded-xl
                            "
                          />

                        )}

                      </div>

                    )

                  )}

                </div>

              </div>

            )

          )}

        </div>

      </div>

      {/* ANSWER KEY */}

      {showAnswers && (

        <div
          className="
            mt-10
            bg-white
            rounded-3xl
            p-8
            shadow-sm
          "
        >

          <h2
            className="
              text-4xl
              font-bold
              text-center
              mb-12
            "
          >

            ANSWER KEY

          </h2>

          <div className="space-y-10">

            {generatedData.sections.map(

              (
                section: any,
                sectionIndex: number
              ) => (

                <div key={sectionIndex}>

                  <h3
                    className="
                      text-2xl
                      font-bold
                      mb-6
                    "
                  >

                    {
                      section.title
                    }

                  </h3>

                  <div className="space-y-6">

                    {section.questions.map(

                      (
                        q: any,
                        qIndex: number
                      ) => (

                        <div
                          key={qIndex}
                          className="
                            border
                            rounded-2xl
                            p-6
                            bg-gray-50
                          "
                        >

                          <p className="font-semibold">

                            {qIndex + 1}.
                            {' '}
                            {q.question}

                          </p>

                          <div
                            className="
                              mt-4
                              bg-white
                              rounded-xl
                              p-4
                            "
                          >

                            <p
                              className="
                                font-bold
                                mb-2
                              "
                            >

                              Answer:

                            </p>

                            <p>

                              {
                                q.answer ||
                                'No answer available'
                              }

                            </p>

                          </div>

                        </div>

                      )

                    )}

                  </div>

                </div>

              )

            )}

          </div>

        </div>

      )}

    </div>

  );

}