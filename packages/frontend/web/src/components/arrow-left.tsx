import { useNavigate } from 'react-router-dom';

export function ArrowLeft() {
  const navigate = useNavigate();
  return (
    <div className='mb-4 flex items-center justify-between'>
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
          className='h-7 w-7 md:h-10 md:w-10'
        />
      </button>
    </div>
  );
}
