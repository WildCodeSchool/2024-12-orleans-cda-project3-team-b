export default function HireCrewMembers() {
  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button' className='text-secondary hover:text-orange-500'>
          <img
            src='/assets/arrow-left.png'
            alt='arrow left'
            className='W-10 h-10'
          />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE CREW MEMBERS'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'CREW MEMBERS'}
      </div>
      <div className='flex flex-col gap-4'>
        <div className='bg-secondary flex h-20 w-110 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
          <img
            className='h-16 w-16 rounded-4xl'
            src='/assets/alex-harper.jpeg'
            alt=''
          />
          <span className='flex flex-col items-center'>
            <h2 className='ml-2'>{' Alex Harper'}</h2>
            <h3>{' Rock'}</h3>
          </span>
          <span className='flex items-center'>
            <h2 className='flex items-center font-bold'>{'3,2 '}</h2>
            <img
              className='mt-0.5 h-5 w-5'
              src='/assets/star-sign.png'
              alt=''
            />
          </span>
          <span className='flex flex-col items-center'>
            <button
              type='button'
              className='flex h-8 w-18 items-center justify-center rounded-sm bg-orange-500 pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
            >
              {' Hire '}
              <img
                className='h-7 w-7'
                src='/assets/sign.png'
                alt='contract logo'
              />
            </button>
            <span className='flex items-center'>
              <h2 className='flex items-center font-bold'>{'50,000'}</h2>
              <img
                className='mt-0.5 h-3.5 w-3.5'
                src='/assets/dollar-icon.png'
                alt=''
              />
            </span>
          </span>
        </div>
      </div>
      <button
        type='button'
        className='bg-secondary mt-5 flex h-8 w-25 items-center justify-center rounded-sm text-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
      >
        {'See More'}
      </button>
    </div>
  );
}
