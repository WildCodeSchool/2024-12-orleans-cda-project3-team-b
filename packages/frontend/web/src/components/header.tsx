import { useState } from 'react';
import { Link } from 'react-router-dom';

import CustomLink from './customer-link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <header className='border-b-orange bg-blue flex h-26 w-full flex-col border-b-3 text-white sm:h-46'>
      <div
        className='slogan m-auto mt-12 hidden text-5xl font-bold sm:block'
        onClick={closeMenu}
      >
        {'MUSIC LABEL MANAGER'}
      </div>
      <nav className='m-auto'>
        <ul className='mb-10 hidden flex-row gap-12 sm:flex'>
          <CustomLink to={'/register'}>{'SIGN UP'}</CustomLink>
          <CustomLink to={'/login'}>{'LOGIN'}</CustomLink>
          <CustomLink to={'/register'}>{'Privacy Policy'}</CustomLink>
        </ul>
      </nav>
      <div
        className={`absolute z-2 h-full w-full bg-transparent ${isOpen ? 'flex' : 'hidden'}`}
        onClick={closeMenu}
      />
      <div
        className='absolute top-8 right-5 z-4 flex w-8 sm:hidden'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img
          src={isOpen ? '/assets/cross.png' : '/assets/burger-bar.png'}
          alt='menu burger'
        />
      </div>
      <div className={isOpen ? 'flex' : 'hidden'} onClick={closeMenu} />
      <nav
        className={`bg-blue absolute top-18 z-3 h-62 w-full items-start justify-center text-2xl shadow-[0_5px_5px_rgba(0,0,0,0.25)] ${isOpen ? 'flex' : 'hidden'}`}
      >
        <ul onClick={closeMenu} className='flex flex-col items-center'>
          <Link to='/'>{'Home'}</Link>
          <Link to=''>{'Privacy Policy'}</Link>
          <Link to='/register'>{'Sign up'}</Link>
          <Link to='/login'>{'Login'}</Link>
        </ul>
      </nav>
    </header>
  );
}
