import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function HeaderDesktop() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='border-b-orange bg-secondary flex h-20 w-full border-b-3 text-white'>
      <div className='flex w-full items-center justify-between pr-4'>
        <div className='flex'>
          <div className='slogan flex items-center border-r-4 border-r-white pr-4 text-xl font-bold'>
            <img
              className='h-18 w-18'
              src='/assets/orange.png'
              alt="Label's logo"
            />
            {'Nom Label'}
          </div>
          <div className='flex items-center space-x-4 border-r-4 border-r-white pr-4 pl-4 text-xl'>
            <p className='m-0 pr-1 font-bold'>{'Level'}</p>
            <span className='bg-primary flex h-5 w-5 items-center rounded-xs font-bold text-orange-500'>
              <p className='ml-1'>{'2'}</p>
            </span>
            <p className='flex items-center font-bold'>
              {'3,2 '}
              <img
                className='h-6 w-6'
                src='/assets/star-sign.png'
                alt='star sign'
              />
            </p>
            <p className='flex items-center font-bold'>
              {'50,000'}
              <img
                className='mt-0.5 h-5 w-6 pl-1'
                src='/assets/dollar-icon.png'
                alt='dollar sign'
              />
            </p>
          </div>
        </div>
        <nav className='flex items-center'>
          <ul className='flex justify-end space-x-4 text-xl font-bold'>
            <li>
              <Link to=''>{'MyArtists'}</Link>
            </li>
            <li>
              <Link to=''>{'MyAlbums'}</Link>
            </li>
            <li>
              <img
                className='w-10'
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                src='/assets/points.png'
                alt='three dots menu'
              />
            </li>
          </ul>
          <ul
            onClick={() => {
              setIsOpen(true); // Optionnel, cela fermera le menu quand un élément est cliqué
            }}
            className={`${isOpen ? 'absolute' : 'hidden'} bg-secondary top-18 right-0 w-45 pl-1 font-bold`}
          >
            <li>
              <Link to=''>{'Legal Mentions'}</Link>
            </li>
            <li>
              <Link to=''>{'Confidentiality policy'}</Link>
            </li>
            <li>
              <Link to=''>{'Profile'}</Link>
            </li>
            <li className='flex items-center'>
              <Link to=''>
                <img
                  className='w-8'
                  src='\assets\log-out.png'
                  alt='log out logo'
                />
              </Link>
              <Link to=''>{'Log out '}</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
