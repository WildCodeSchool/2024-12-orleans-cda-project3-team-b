import { Link } from 'react-router-dom';

import Button from '../components/+button';

export default function MainMenu() {
  return (
    <>
      <header className='h-19 text-center text-4xl'>
        <h1>{'HEADER'}</h1>
      </header>
      <div className='mx-auto bg-[#EDF4F6] text-center'>
        <div className='flex h-70 flex-col items-center justify-center'>
          <h2 className='pb-7 text-6xl text-[#15414E] underline'>
            {'MyARTISTS'}
          </h2>
          <Link to='/hireartist'>
            <Button>{'+'}</Button>
          </Link>

          <h2 className='pt-1 text-2xl text-[#15414E]'>
            {'Hire a new artist'}
          </h2>
        </div>
        <div className='h-70 pt-7'>
          <h2 className='text-6xl text-[#15414E] underline'>{' RECORD'}</h2>

          <div className='flex h-50 items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <Button>{'+'}</Button>
              <h2 className='pt-1 text-2xl text-[#15414E]'>
                {'Create a new single'}
              </h2>
            </div>
            <div className='flex flex-col items-center justify-center pl-10'>
              <Button>{'+'}</Button>
              <h3 className='pt-1 text-2xl text-[#15414E]'>
                {'Create a new album'}
              </h3>
            </div>
          </div>
        </div>
        <div className='h-70 pt-7'>
          <h2 className='text-6xl text-[#15414E] underline'>{' STAFF'}</h2>
          <div className='flex h-50 items-center justify-center'>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Button>{'+'}</Button>
              <h3>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Button>{'+'}</Button>
              <h3>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Button>{'+'}</Button>
              <h3>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Button>{'+'}</Button>
              <h3>{'Hire staff'}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
