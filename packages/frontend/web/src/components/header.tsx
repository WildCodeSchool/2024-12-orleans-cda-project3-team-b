import { useState } from 'react';
import { Link } from 'react-router-dom';

import MenuBurger from '../../../assets/burger-bar.png';
import Close from '../../../assets/croix.png';

export default function Header() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <header className='--font-display flex h-[105px] w-full flex-col border-b-(--color-orange) bg-(--color-blue) text-(--color-white) sm:h-[185px]'>
      <div className='slogan m-auto mt-[48px] hidden text-[48px] font-bold sm:block'>
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
      {/* <div className={`w-full h-full  z-2 bg-red-500 ${open ? "flex" : "hidden"}`}></div> */}
      <div
        className='absolute top-8 right-5 z-3 flex w-[32px] sm:hidden'
        onClick={() => {
          setOpen(!open);
        }}
      >
        <img src={open ? Close : MenuBurger} alt='menu burger' />
      </div>
      <div className={open ? 'flex' : 'hidden'} onClick={closeMenu} />
      <nav
        className={`--font-display absolute h-[385px] w-full items-center justify-center bg-(--color-blue) text-2xl ${open ? 'flex' : 'hidden'}`}
      >
        <ul onClick={closeMenu}>
          <li>
            <Link to='/'>{'Home'}</Link>
          </li>
          <li>
            <Link to=''>{'My Album'}</Link>
          </li>
          <li>
            <Link to=''>{'My artists'}</Link>
          </li>
          <li>
            <Link to=''>{'Privacy Policy'}</Link>
          </li>
          <li>
            <Link to=''>{'Profil'}</Link>
          </li>
          <li>
            <Link to=''>{'Log out'}</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
