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
} from '@/utils/localStorage';

export default function AssignmentViewPage() {

  const params =
    useParams();

  const [paperData, setPaperData] =
    useState<any>(null);

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

        (a: any) =>

          a.id.toString() ===
          id

      );

    if (
      found &&
      found.data
    ) {

      setPaperData(
        found.data
      );

    }

  }, [params]);

  if (!paperData) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          text-3xl
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
        min-h-screen
        bg-gray-100
        p-4
        md:p-10
      "
    >

      <GeneratedPaper
        generatedData={
          paperData
        }
      />

    </div>

  );

}