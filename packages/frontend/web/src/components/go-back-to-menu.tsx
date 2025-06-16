import { useNavigate } from 'react-router-dom';

export function GoBackToMenu() {
  const navigate = useNavigate();
  return (
    <div className='mb-4 flex w-full items-center justify-between'>
      <button
        onClick={async () => {
          await navigate('/main-menu');
        }}
        type='button'
        className='text-primary hover:text-secondary bg-orange mt-6 h-10 w-56 rounded-md shadow-[3px_5px_6px_rgba(0,0,0,0.30)] transition-transform hover:scale-95 active:scale-95'
      >
        {'Go Back to menu '}
      </button>
    </div>
  );
}
