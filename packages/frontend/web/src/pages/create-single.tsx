import HeaderDesktop from '@/components/header-desktop';

export default function CreateSingle() {
  return (
    <>
      <HeaderDesktop />
      <div>
        <div className='mb-4 flex w-full items-center justify-between'>
          <button
            type='button'
            className='text-secondary hover:text-orange-500'
          >
            <img
              src='/assets/arrow-left.png'
              alt='arrow left'
              className='W-10 h-10'
            />
          </button>
          <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
            {'HIRE ARTISTS'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img
          className='flex h-12 w-12 items-center justify-center'
          src='assets/music-note.png'
          alt=''
        />
      </div>
    </>
  );
}
