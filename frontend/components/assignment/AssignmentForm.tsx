'use client';

import { useForm } from 'react-hook-form';

import { api } from '@/services/api';

export default function AssignmentForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    await api.post('/assignments', data);

    alert('Assignment Created');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='space-y-4'
    >
      <input
        {...register('title')}
        placeholder='Assignment Title'
        className='border p-3 rounded-xl w-full'
      />

      <textarea
        {...register('instructions')}
        placeholder='Instructions'
        className='border p-3 rounded-xl w-full'
      />

      <button
        className='bg-black text-white px-5 py-3 rounded-xl'
      >
        Create Assignment
      </button>
    </form>
  );
}