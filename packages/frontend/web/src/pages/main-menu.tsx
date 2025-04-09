import { useNavigate } from 'react-router-dom';

export default function MainMenu() {
  const navigate = useNavigate();

  const handleClick = () => {
    void navigate('/hireartist');
  };

  return (
    <>
      <header className='h-19 text-center text-4xl'>
        <h1>{'HEADER'}</h1>
      </header>
      <div className='bg-[#EDF4F6] text-center'>
        <div className='flex h-70 flex-col items-center justify-center'>
          <h1 className='pb-7 text-6xl text-[#15414E] underline'>
            {'MyArtists'}
          </h1>
          <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
            <button
              type='button'
              onClick={handleClick}
              className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
            >
              {'+'}
            </button>
          </span>

          <h2 className='pt-1 text-2xl text-[#15414E]'>
            {'Hire a new artist'}
          </h2>
        </div>
        <div className='h-70 pt-7'>
          <h1 className='text-6xl text-[#15414E] underline'>{' Record'}</h1>

          <div className='flex h-50 items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
                <button
                  type='button'
                  onClick={handleClick}
                  className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
                >
                  {'+'}
                </button>
              </span>

              <h2 className='pt-1 text-2xl text-[#15414E]'>
                {'Create a new single'}
              </h2>
            </div>
            <div className='flex flex-col items-center justify-center pl-10'>
              <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
                <button
                  type='button'
                  onClick={handleClick}
                  className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
                >
                  {'+'}
                </button>
              </span>
              <h2 className='pt-1 text-2xl text-[#15414E]'>
                {'Create a new album'}
              </h2>
            </div>
          </div>
        </div>
        <div className='h-70 pt-7'>
          <h1 className='text-6xl text-[#15414E] underline'>{' Staff'}</h1>
          <div className='flex h-50 items-center justify-center'>
            <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
              <button
                type='button'
                onClick={handleClick}
                className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
              >
                {'+'}
              </button>
            </span>
            <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
              <button
                type='button'
                onClick={handleClick}
                className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
              >
                {'+'}
              </button>
            </span>
            <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
              <button
                type='button'
                onClick={handleClick}
                className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
              >
                {'+'}
              </button>
            </span>
            <span className='mx-auto flex h-13 w-14 items-center justify-center rounded-xl bg-[#15414E] shadow-[3px_5px_6px_rgba(0,0,0,0.30)] inset-ring-2 inset-ring-white'>
              <button
                type='button'
                onClick={handleClick}
                className='flex h-11 flex-col items-center justify-center pb-3 text-6xl text-white'
              >
                {'+'}
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
