import { useNavigate } from 'react-router';

export default function MyAlbums() {
  const navigate = useNavigate();
  return (
    <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button
          onClick={async () => {
            await navigate(-1);
          }}
          type='button'
          className='text-secondary mb-18'
        >
          <img
            src='/assets/arrow-left.png'
            alt='arrow left'
            className='W-10 h-10'
          />
        </button>
        <div className='flex flex-col items-center'>
          <img className='h-22 w-22' src='/assets/album.png' alt='' />
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'MyAlbums'}
          </h1>
        </div>
        <div className='h-6 w-6' />
      </div>
      <div className='text-secondary mt-4 mb-8 flex flex-col items-center text-xl font-semibold'>
        <div className='flex items-center'>
          <h2> {'Total notoriety gain:'}</h2>
          <h3 className='ml-2 flex items-center text-xl font-bold'>{'3,2 '}</h3>
          <img className='mt-0.5 h-6 w-6' src='/assets/star-sign.png' alt='' />
        </div>
        <div className='flex items-center'>
          <h2>{'Total sales:'}</h2>
          <h3 className='ml-2 flex items-center text-xl font-bold'>
            {'250,000 '}
          </h3>
          <img className='mt-0.5 h-6 w-6' src='/assets/album.png' alt='' />
        </div>
        <div className='flex items-center'>
          <h2>{'Total earned money:'}</h2>
          <h3 className='ml-2 flex items-center text-xl font-bold'>
            {'4,250,000 '}
          </h3>
          <img
            className='mt-0.5 h-4 w-4'
            src='/assets/dollar-icon.png'
            alt=''
          />
        </div>
      </div>

      <div className='bg-secondary flex h-46 w-84 flex-col items-center gap-4 rounded-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
        <h2 className='mt-3 font-bold'>{'ALBUMS'}</h2>
        <h3 className='font-extralight'> {'Doo-Wops & Hooligans'}</h3>
        <h3 className='font-extralight'> {'Unorthodox Jukebox'}</h3>
        <h3 className='font-extralight'> {'24K Magic'}</h3>
      </div>
    </div>
  );
}
