/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { useParams }
from 'next/navigation';

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

  return (

    <div
      className="
        p-10
        text-black
      "
    >

      <h1 className="text-3xl font-bold">

        DEBUG PAGE

      </h1>

      <pre
        className="
          mt-10
          whitespace-pre-wrap
          text-sm
        "
      >

        {

          JSON.stringify(

            {

              routeId: id,

              assignments,

            },

            null,

            2

          )

        }

      </pre>

    </div>

  );

}