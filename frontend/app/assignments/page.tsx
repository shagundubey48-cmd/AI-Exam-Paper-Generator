/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import Link from 'next/link';

export default function AssignmentsPage() {

  const assignments =

    typeof window !==
    'undefined'

      ? JSON.parse(

          localStorage.getItem(
            'veda_assignments'
          ) || '[]'

        )

      : [];

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
        "
      >

        <h1
          className="
            text-4xl
            font-bold
            mb-10
          "
        >

          Assignments

        </h1>

        <div className="space-y-6">

          {assignments.map(

            (
              assignment: any
            ) => (

              <div

                key={assignment.id}

                className="
                  bg-white
                  rounded-3xl
                  p-6
                  shadow-sm
                "

              >

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >

                  {
                    assignment.title
                  }

                </h2>

                <p className="mt-2 text-gray-500">

                  {
                    assignment.subject
                  }

                </p>

                <div className="mt-5">

                  <Link

                    href={`/assignments/${assignment.id}`}

                  >

                    <button
                      className="
                        bg-black
                        text-white
                        px-5
                        py-3
                        rounded-xl
                      "
                    >

                      View Assignment

                    </button>

                  </Link>

                </div>

              </div>

            )

          )}

        </div>

      </div>

    </div>

  );

}