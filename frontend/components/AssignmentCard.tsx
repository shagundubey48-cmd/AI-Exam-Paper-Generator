'use client';

import Link from 'next/link';

export default function AssignmentCard({ assignment }: any) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-xl font-bold">
            {assignment.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {assignment.subject}
          </p>

        </div>

      </div>

      <div className="mt-6 flex justify-between text-sm text-gray-500">

        <p>
          Questions: {assignment.totalQuestions}
        </p>

        <p>
          Marks: {assignment.totalMarks}
        </p>

      </div>

      <div className="mt-6 flex gap-3">

        <Link
          href={`/assignment/${assignment._id}`}
          className="bg-black text-white px-5 py-2 rounded-xl"
        >
          View
        </Link>

      </div>

    </div>

  );

}