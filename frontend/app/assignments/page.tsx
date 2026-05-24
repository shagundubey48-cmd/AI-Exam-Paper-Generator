/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useEffect, useState }
from 'react';

import Link
from 'next/link';

import {

  getAssignments,

  deleteAssignment,

} from '@/utils/localStorage';

import {

  AssignmentData,

} from '@/store/useAssignmentStore';

import {

  StoredAssignment,

} from '@/utils/localStorage';

export default function AssignmentsPage() {

 const [assignments, setAssignments] =
  useState<StoredAssignment[]>([]);

  useEffect(() => {

    const storedAssignments:
  StoredAssignment[] =

  getAssignments();

    setAssignments(
      storedAssignments
    );

  }, []);

  const handleDelete =
    (id: number) => {

      deleteAssignment(id);

      const updated:
  StoredAssignment[] =

  getAssignments();

      setAssignments(
        updated
      );

    };

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        p-6
        md:p-10
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <div
          className="
            flex
            justify-between
            items-center
            mb-10
          "
        >

          <h1
            className="
              text-3xl
              md:text-5xl
              font-bold
            "
          >

            Assignments

          </h1>

          <Link href="/create">

            <button
              className="
                bg-black
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
              "
            >

              Create Assignment

            </button>

          </Link>

        </div>

        {

          assignments.length === 0 && (

            <div
              className="
                bg-white
                rounded-3xl
                p-20
                text-center
              "
            >

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >

                No assignments yet

              </h2>

              <p
                className="
                  mt-4
                  text-gray-500
                "
              >

                Create your first
                AI assignment.

              </p>

            </div>

          )

        }

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {assignments.map(

            (
              assignment
            ) => (

              <div

                key={
                  assignment.id
                }

                className="
                  bg-white
                  rounded-3xl
                  p-8
                  shadow-sm
                "

              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                  "
                >

                  <div>

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

                    <p
                      className="
                        mt-3
                        text-gray-500
                      "
                    >

                      {
                        assignment.subject
                      }

                    </p>

                  </div>

                  <button

                    onClick={() =>
                      handleDelete(
                        assignment.id
                      )
                    }

                    className="
                      text-red-500
                      font-semibold
                    "

                  >

                    Delete

                  </button>

                </div>

                <div
                  className="
                    mt-8
                    space-y-3
                    text-sm
                  "
                >

                  <p>

                    Questions:
                    {' '}
                    {
                      assignment.totalQuestions
                    }

                  </p>

                  <p>

                    Marks:
                    {' '}
                    {
                      assignment.totalMarks
                    }

                  </p>

                  <p>

                    Created:
                    {' '}
                    {
                      assignment.createdAt
                    }

                  </p>

                </div>

                <Link
                  href={`/assignments/${assignment.id}`}
                >

                  <button
                    className="
                      mt-8
                      w-full
                      bg-black
                      text-white
                      py-3
                      rounded-2xl
                      font-semibold
                    "
                  >

                    View Assignment

                  </button>

                </Link>

              </div>

            )

          )}

        </div>

      </div>

    </div>

  );

}