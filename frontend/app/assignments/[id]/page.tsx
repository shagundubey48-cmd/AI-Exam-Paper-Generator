'use client';

import {
  useMemo,
} from 'react';

import { useParams }
from 'next/navigation';

import GeneratedPaper
from '@/components/GeneratedPaper';

import {

  getAssignments,

} from '@/utils/localStorage';

export default function AssignmentViewPage() {

  const params =
    useParams();

  const assignment =
    useMemo(() => {

      const all =
        getAssignments();

      const id =
        Array.isArray(params.id)

          ? params.id[0]

          : params.id;

      return all.find(

        (a) =>

          a.id.toString() ===
          id

      );

    }, [params]);

  if (!assignment) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
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
          assignment
        }
      />

    </div>

  );

}