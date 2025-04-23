import { useNavigate } from 'react-router';

import AddButton from '@/components/add-button';
import CancelButton from '@/components/cancel-button';
import ConfirmButton from '@/components/confirm-button';
import HeaderDesktop from '@/components/header-desktop';

export default function CreateSingle() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderDesktop />
      <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <button
            type='button'
            className='text-secondary hover:text-orange-500'
            onClick={async () => {
              await navigate(-1);
            }}
          >
            <img
              src='/assets/arrow-left.png'
              alt='arrow left'
              className='W-10 h-10'
            />
          </button>
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'RECORDING A NEW SINGLE'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img className='h-18 w-18' src='/assets/music-note.png' alt='' />
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-secondary mt-8 text-center text-xl'>
            {"Choose your single's name:"}
          </h2>
          <input
            className='mt-3 flex justify-center rounded border border-blue-400 shadow'
            type='text'
            placeholder="Single's name"
          />
        </div>
        <span className='mt-12 flex w-full flex-col items-center justify-between'>
          <AddButton>{'+'}</AddButton>
          <h2 className='text-secondary mt-1 text-center text-xl'>
            {'MARKETING CAMPAIGN'}
          </h2>
        </span>
        <span className='mt-12 flex items-center justify-between gap-x-16'>
          <CancelButton />
          <ConfirmButton />
        </span>
      </div>
    </>
  );
}
