import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuBurger from '../../../assets/burger-bar.png';
import Close from '../../../assets/croix.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <header className='--font-display border-b-orange bg-blue flex h-[105px] w-full flex-col border-b-3 text-white sm:h-[185px]'>
      <div
        className='slogan m-auto mt-[48px] hidden text-[48px] font-bold sm:block'
        onClick={closeMenu}
      >
        {'MUSIC LABEL MANAGER'}
      </div>
      <nav className='m-auto'>
        <ul className='mb-[40px] hidden flex-row gap-[50px] sm:flex'>
          <li>
            <Link to=''>{'SIGN IN'}</Link>
          </li>
          <li>
            <Link to=''>{'LOGIN'}</Link>
          </li>
          <li>
            <Link to=''>{'PRIVACY POLICY'}</Link>
          </li>
        </ul>
      </nav>
      <div
        className={`absolute z-2 h-full w-full bg-transparent ${isOpen ? 'flex' : 'hidden'}`}
        onClick={closeMenu}
      />
      <div
        className='absolute top-8 right-5 z-4 flex w-[32px] sm:hidden'
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <img src={isOpen ? Close : MenuBurger} alt='menu burger' />
      </div>
      <div className={isOpen ? 'flex' : 'hidden'} onClick={closeMenu} />
      <nav
        className={`--font-display absolute top-[69px] z-3 h-[247px] w-full items-start justify-center bg-(--color-blue) text-2xl shadow-[0_5px_5px_rgba(0,0,0,0.25)] ${isOpen ? 'flex' : 'hidden'}`}
      >
        <ul onClick={closeMenu} className='text-center'>
          <li className='hover:text-orange'>
            <Link to='/'>{'Home'}</Link>
          </li>
          <li className='hover:text-orange'>
            <Link to=''>{'My Album'}</Link>
          </li>
          <li className='hover:text-orange'>
            <Link to=''>{'My artists'}</Link>
          </li>
          <li className='hover:text-orange'>
            <Link to=''>{'Privacy Policy'}</Link>
          </li>
          <li className='hover:text-orange'>
            <Link to=''>{'Profil'}</Link>
          </li>
          <li className='hover:text-orange'>
            <Link to=''>{'Log out'}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
