export default function Navbar() {
  return (
    <div className='h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6'>
      <div>
        <h2 className='font-semibold text-xl'>
          Assignments
        </h2>

        <p className='text-sm text-zinc-500'>
          Manage your assignments
        </p>
      </div>

      <div className='flex items-center gap-4'>
        <div className='w-10 h-10 rounded-full bg-zinc-300' />
      </div>
    </div>
  );
}