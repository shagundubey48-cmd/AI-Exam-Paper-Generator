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

export default function AssignmentViewPage() {

  const params =
    useParams();

  const [generatedData, setGeneratedData] =
    useState<any>(null);

  useEffect(() => {

    const stored =
      localStorage.getItem(
        'veda_assignments'
      );

    if (!stored) return;

    const assignments =
      JSON.parse(stored);

    const id =

      Array.isArray(
        params.id
      )

        ? params.id[0]

        : params.id;

    const found =
      assignments.find(

        (a: any) =>

          a.id.toString() ===
          id

      );

    if (
      found &&
      found.data
    ) {

      setGeneratedData(
        found.data
      );

    }

  }, [params]);

  if (!generatedData) {

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
          generatedData
        }
      />

    </div>

  );

}