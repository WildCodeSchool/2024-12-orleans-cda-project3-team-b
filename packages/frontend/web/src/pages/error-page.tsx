import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router';

import Input from '@/components/input';

import HttpError from '../utils/http-error';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError();

  const returnHome = async () => {
    await navigate('/');
  };

  let title = 'An Error Occurred';
  let message = 'Something went wrong.';

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = 'Page Not Found - Error 404';
      message = 'The page you are looking for does not exist.';
    }
  } else if (error instanceof HttpError) {
    title = error.title;
    message = error.message;
  }

  return (
    <div className='bg-primaryColor flex min-h-screen flex-col'>
      <div className='flex flex-1 items-center justify-center p-8'>
        <div className='relative z-2 w-full max-w-3xl bg-transparent text-white'>
          <div className='flex flex-col items-center gap-4 text-center'>
            <img
              className='h-32 w-auto md:h-42'
              src='/assets/logo-label.png'
              alt='Logo Label'
            />
            <div className='flex flex-col gap-6'>
              <h1 className='text-3xl font-light'>{title}</h1>
              <p className='text-lg text-gray-300'>{message}</p>
              <Input
                type='button'
                value='Return to Home'
                name='submit'
                onClick={returnHome}
                className='w-full cursor-pointer self-center rounded-full border-0 bg-blue-400 p-3 text-black transition duration-300 ease-in-out hover:bg-orange-400 hover:text-gray-300 md:w-1/2'
              />
            </div>
          </div>
        </div>
        <img
          className='pointer-events-none fixed right-0 bottom-0 w-md md:w-xl lg:w-2xl'
          src='/assets/vinyl.png'
          alt='Vinyle'
        />
      </div>
    </div>
  );
}
