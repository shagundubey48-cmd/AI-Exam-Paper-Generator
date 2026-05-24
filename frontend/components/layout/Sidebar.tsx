export default function Sidebar() {
  return (
    <div className='w-64 h-screen bg-white border-r border-zinc-200 p-5 flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-bold text-black'>
          VedaAI
        </h1>

        <button className='mt-8 w-full bg-black text-white py-3 rounded-2xl hover:opacity-90 transition'>
          Create Assignment
        </button>

        <div className='mt-10 space-y-2'>
          <div className='px-4 py-3 rounded-xl bg-zinc-100 font-medium'>
            Home
          </div>

          <div className='px-4 py-3 rounded-xl text-zinc-600 hover:bg-zinc-100 transition'>
            Assignments
          </div>

          <div className='px-4 py-3 rounded-xl text-zinc-600 hover:bg-zinc-100 transition'>
            AI Toolkit
          </div>

          <div className='px-4 py-3 rounded-xl text-zinc-600 hover:bg-zinc-100 transition'>
            Library
          </div>
        </div>
      </div>

      <div className='bg-zinc-100 rounded-2xl p-4'>
        <p className='font-semibold'>
          Delhi Public School
        </p>

        <p className='text-sm text-zinc-500'>
          Bokaro Steel City
        </p>
      </div>
    </div>
  );
}