import { ArrowLeft, StarIcon } from 'lucide-react';

export default function HireArtist() {
  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button className='text-secondary hover:text-orange-500'>
          <ArrowLeft className='h-6 w-6' />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE ARTISTS'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-4 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>

      <div className='bg-secondary mt-4 flex h-20 w-110 items-center justify-evenly rounded-sm text-white'>
        <img
          className='h-16 w-16 rounded-4xl'
          src='/assets/alex-harper.jpeg'
          alt=''
        />
        <span className='flex flex-col items-center'>
          <h2 className='ml-2'>{' Alex Harper'}</h2>
          <h3>{' Rock'}</h3>
        </span>
        <h2 className='ml-5 flex items-center font-bold'>
          {'3,2 '}
          <img className='h-6 w-6' src='/assets/star-sign.png' alt='' />
        </h2>
        <span className='flex flex-col items-center'>
          <button className='flex h-8 w-18 items-center justify-center rounded-sm bg-orange-500 pl-2 text-xl font-bold'>
            {' Hire '}
            <img className='h-7 w-7' src='/assets/sign.png' alt='' />
          </button>
          <h2 className='flex items-center font-bold'>
            {'50,000'}
            <img
              className='mt-1 h-6 w-6 pl-1'
              src='/assets/dollar-icon.png'
              alt=''
            />
          </h2>
        </span>
      </div>
    </div>
  );
}
