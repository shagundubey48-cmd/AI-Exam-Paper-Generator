'use client';

import Link from 'next/link';

export default function Sidebar() {

  return (

    <div className="w-[260px] min-h-screen bg-white border-r p-6 hidden lg:block">

      <h1 className="text-3xl font-bold">
        VedaAI
      </h1>

      <div className="mt-10 space-y-4">

        <Link href="/dashboard" className="block p-3 rounded-xl hover:bg-gray-100">
          Dashboard
        </Link>

        <Link href="/assignments" className="block p-3 rounded-xl hover:bg-gray-100">
          Assignments
        </Link>

        <Link href="/create" className="block p-3 rounded-xl bg-black text-white">
          Create Assignment
        </Link>

        <Link href="#" className="block p-3 rounded-xl hover:bg-gray-100">
          AI Toolkit
        </Link>

        <Link href="#" className="block p-3 rounded-xl hover:bg-gray-100">
          Library
        </Link>

      </div>

    </div>

  );

}