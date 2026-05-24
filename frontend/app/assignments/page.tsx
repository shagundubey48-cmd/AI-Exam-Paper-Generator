/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useParams }
from 'next/navigation';

import GeneratedPaper
from '@/components/GeneratedPaper';

export default function AssignmentViewPage() {

  const params =
    useParams();

  const stored =

    typeof window !==
    'undefined'

      ? localStorage.getItem(
          'veda_assignments'
        )

      : null;

  const assignments =
    stored
      ? JSON.parse(stored)
      : [];

  const id =

    Array.isArray(
      params.id
    )

      ? params.id[0]

      : params.id;

  const assignment =
    assignments.find(

      (a: any) =>

        a.id.toString() ===
        id

    );

  if (
    !assignment
  ) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-4xl
          font-bold
        "
      >

        Assignment Not Found

      </div>

    );

  }

  return (

    <div
      className="
        bg-gray-100
        min-h-screen
        p-4
        md:p-10
      "
    >

      <GeneratedPaper
        generatedData={
          assignment.data
        }
      />

    </div>

  );

}