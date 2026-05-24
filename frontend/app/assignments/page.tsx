/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useParams }
from 'next/navigation';

import {
  useEffect,
  useState,
} from 'react';

import GeneratedPaper
from '@/components/GeneratedPaper';

import {
  getAssignments,
}
from '@/utils/localStorage';

import {

  StoredAssignment,

} from '@/utils/localStorage';

export default function AssignmentViewPage() {

  const params =
    useParams();

  const [assignment, setAssignment] =
    useState<StoredAssignment | null>(
      null
    );

  useEffect(() => {

    const all =
      getAssignments();

    const id =

      Array.isArray(
        params.id
      )

        ? params.id[0]

        : params.id;

    const found =

      all.find(

        (a) =>

          a.id.toString() ===
          id

      ) || null;

    setAssignment(
      found
    );

  }, [params.id]);

  if (!assignment) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-2xl
          font-bold
        "
      >

        Loading...

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