import { useNavigate } from 'react-router';

import HeaderDesktop from '@/components/header-desktop';

export default function MyAlbums() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderDesktop />
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <button
            onClick={async () => {
              await navigate(-1);
            }}
            type='button'
            className='text-secondary hover:text-orange-500'
          >
            <img
              src='/assets/arrow-left.png'
              alt='arrow left'
              className='W-10 h-10'
            />
          </button>
          <span className='flex flex-col items-center'>
            <img className='h-22 w-22' src='/assets/album.png' alt='' />
            <h1 className='text-secondary text-center text-2xl font-bold'>
              {'MyAlbums'}
            </h1>
          </span>
          <div className='h-6 w-6' />
        </div>
      </div>
    </>
  );
}
