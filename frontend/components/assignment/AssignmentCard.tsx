interface Props {
  title: string;
  status: string;
}

export default function AssignmentCard({
  title,
  status,
}: Props) {
  return (
    <div className='bg-white rounded-3xl p-6 shadow-sm border border-zinc-200 hover:shadow-md transition'>
      <h2 className='text-2xl font-bold text-black'>
        {title}
      </h2>

      <div className='mt-5 flex items-center justify-between'>
        <p className='text-zinc-600'>
          {status}
        </p>

        <div
          className={`px-3 py-1 rounded-full text-sm ${
            status === 'Completed'
              ? 'bg-green-100 text-green-700'
              : status === 'Processing'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-zinc-200 text-zinc-700'
          }`}
        >
          {status}
        </div>
      </div>
    </div>
  );
}