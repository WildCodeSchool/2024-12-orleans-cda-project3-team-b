import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import AddButton from '@/components/add-button';
import AddSingle from '@/components/add-single';
import HeaderDesktop from '@/components/header-desktop';
import RemoveSingle from '@/components/remove-single';
import VerifyButton from '@/components/verify-button';

export default function CreateAlbumMenu() {
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
            {'RECORDING A NEW ALBUM'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img className='h-22 w-22' src='/assets/album.png' alt='' />
        <div className='mt-8 flex flex-col items-center justify-center'>
          <Link to='/my-artists'>
            <AddButton>{'+'}</AddButton>
          </Link>

          <h2 className='text-secondary pt-1 text-xl'>{'Choose an artist'}</h2>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-secondary mt-8 text-center text-xl'>
            {"Choose your album's name:"}
          </h2>
          <input
            className='mt-3 w-full max-w-md rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 shadow-[1px_4px_6px_rgba(0,0,0,0.30)]'
            type='text'
            placeholder="Album's name"
          />
        </div>

        <span className='mt-12 flex w-full flex-col items-center gap-2'>
          <h2 className='text-secondary mb-2 text-center text-xl'>
            {'Choose 3 singles:'}
          </h2>
          <RemoveSingle />
          <AddSingle />
          <AddSingle />
        </span>
        <span className='mt-12 flex w-full flex-col items-center justify-between'>
          <AddButton>{'+'}</AddButton>
          <h2 className='text-secondary mt-1 text-center text-xl'>
            {'MARKETING CAMPAIGN'}
          </h2>
        </span>
        <span className='mt-12 flex items-center justify-between gap-x-16'>
          <VerifyButton color='bg-secondary' image='/assets/not-check.png'>
            {'Cancel'}
          </VerifyButton>
          <VerifyButton color='bg-orange-500' image='/assets/check.png'>
            {'Confirm'}
          </VerifyButton>
        </span>
      </div>
    </>
  );
}
