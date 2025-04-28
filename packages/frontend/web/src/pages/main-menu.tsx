import { Link } from 'react-router-dom';

import AddButton from '../components/add-button';
import HeaderDesktop from '../components/header-desktop';

export default function MainMenu() {
  return (
    <>
      <HeaderDesktop />

      <div className='bg-primary mx-auto text-center'>
        <div className='flex h-70 flex-col items-center justify-center'>
          <h2 className='text-secondary pb-7 text-3xl underline'>
            {'MyARTISTS'}
          </h2>
          <Link to='/hire-artist'>
            <AddButton>{'+'}</AddButton>
          </Link>

          <h2 className='text-secondary pt-1 text-xl'>{'Hire a new artist'}</h2>
        </div>
        <div className='h-70 pt-7'>
          <h2 className='text-secondary text-3xl underline'>{' RECORD'}</h2>

          <div className='flex h-50 items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              <Link to={'/create-single'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h2 className='text-secondary pt-1 text-xl'>
                {'Create a new single'}
              </h2>
            </div>
            <div className='flex flex-col items-center justify-center pl-10'>
              <Link to={'/create-album-menu'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary pt-1 text-xl'>
                {'Create a new album'}
              </h3>
            </div>
          </div>
        </div>
        <div className='h-70 pt-7'>
          <h2 className='text-secondary text-3xl underline'>{' STAFF'}</h2>
          <div className='flex h-50 items-center justify-center'>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Link to={'/hire-staff'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Link to={'/hire-staff'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Link to={'/hire-staff'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
            </div>
            <div className='flex flex-col items-center justify-center pr-10 pl-10'>
              <Link to={'/hire-staff'}>
                <AddButton>{'+'}</AddButton>
              </Link>
              <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
