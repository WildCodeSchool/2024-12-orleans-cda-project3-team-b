import { useState } from 'react';
import { Link } from 'react-router-dom';

import CustomLink from './customer-link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <header className='border-b-orange bg-primaryColor flex h-26 w-full flex-col border-b-3 text-white sm:h-46'>
      <div
        className='slogan m-auto mt-12 hidden text-5xl font-bold sm:block'
        onClick={closeMenu}
      >
        <Link to='/'>{'MUSIC LABEL MANAGER'}</Link>
      </div>
      <nav className='m-auto'>
        <ul className='mb-10 hidden flex-row gap-12 sm:flex'>
          <li>
            <Link to='/sign-up'>{'SIGN UP'}</Link>
          </li>
          <li>
            <Link to='/login'>{'LOGIN'}</Link>
          </li>
          <li>
            <Link to='/privacy-policy'>{'PRIVACY POLICY'}</Link>
          </li>
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
          src={
            isOpen
              ? '../../public/assets/cross.png'
              : '../../public/assets/burger-bar.png'
          }
          alt='menu burger'
        />
      </div>
      <div className={isOpen ? 'flex' : 'hidden'} onClick={closeMenu} />
      <nav
        className={`bg-blue absolute top-18 z-3 h-62 w-full items-start justify-center text-2xl shadow-[0_5px_5px_rgba(0,0,0,0.25)] ${isOpen ? 'flex' : 'hidden'}`}
      >
        <ul onClick={closeMenu} className='text-center'>
          <CustomLink to='/'>{'Home'}</CustomLink>
          <CustomLink to=''>{'My Album'}</CustomLink>
          <CustomLink to=''>{'My artists'}</CustomLink>
          <CustomLink to=''>{'Privacy Policy'}</CustomLink>
          <CustomLink to=''>{'Profil'}</CustomLink>
          <CustomLink to=''>{'Log out'}</CustomLink>
        </ul>
      </nav>
    </header>
  );
}
