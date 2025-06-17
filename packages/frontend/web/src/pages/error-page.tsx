import { useNavigate } from 'react-router';

import Input from '@/components/input';
import Vinyl from '@/components/vinyl';

export default function ErrorPage() {
  const navigate = useNavigate();

  const returnHome = async () => {
    await navigate('/');
  };

  return (
    <div className='bg-blue flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='relative z-2 w-full max-w-3xl bg-transparent text-white'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <div className='flex flex-col gap-6'>
              <h1 className='text-3xl font-light'>
                {'Page Not Found - Error 404'}
              </h1>
              <p className='text-lg text-gray-300'>
                {'The page you are looking for does not exist.'}
              </p>
              <Input
                type='button'
                value='Return to Home'
                name='submit'
                onClick={returnHome}
                className='w-full cursor-pointer self-center rounded-full border-0 bg-blue-400 p-3 text-black transition duration-300 ease-in-out hover:bg-orange-400 hover:text-gray-300'
              />
            </div>
          </div>
        </div>
        <Vinyl />
      </div>
    </div>
  );
}
