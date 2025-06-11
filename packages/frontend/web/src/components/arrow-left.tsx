import { useNavigate } from 'react-router-dom';

export function ArrowLeft() {
  const navigate = useNavigate();
  return (
    <div className='absolute mb-4 flex w-full items-center justify-between'>
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
    </div>
  );
}
