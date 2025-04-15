import { useState } from 'react';
import { Link } from 'react-router-dom';

import cinematographie from '../../public/assets/cinematographie.png';

export default function HeaderDesktop() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='border-b-orange bg-secondary flex h-20 w-full border-b-3 text-white'>
      <div className='slogan flex items-center border-r-4 border-r-white pr-4 pl-4 text-xl font-bold'>
        <img
          className='h-18 w-18'
          src='/assets/orange.png'
          alt="Label's logo"
        />
        {'Nom Label'}
      </div>
      <div className='flex items-center space-x-4 border-r-4 border-r-white pr-4 pl-4 text-xl'>
        <p className='m-0 pr-1 font-bold'>{'Level'}</p>
        <span className='bg-primary text-orange flex h-5 w-5 items-center rounded-xs font-bold'>
          <p className='ml-1'>{'2'}</p>{' '}
        </span>
        <p className='flex items-center font-bold'>
          {'3,2 '}
          <img className='h-6 w-6' src='/assets/star-sign.png' alt='' />
        </p>
        <p className='flex items-center font-bold'>
          {'50,000'}
          <img
            className='mt-1 h-6 w-6 pl-1'
            src='/assets/dollar-icon.png'
            alt=''
          />
        </p>
      </div>
      <nav className='mt-4 ml-158'>
        <ul className='flex items-center justify-items-end space-x-4 text-xl font-bold'>
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
              src={cinematographie}
              alt='cinematographie'
            />
          </li>
        </ul>
        <ul
          onClick={() => {
            setIsOpen(true); // Optionnel, cela fermera le menu quand un élément est cliqué
          }}
          className={`${isOpen ? 'display' : 'hidden'} bg-secondary ml-55 w-45 pl-1 font-bold`}
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
              {' '}
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
    </header>
  );
}
