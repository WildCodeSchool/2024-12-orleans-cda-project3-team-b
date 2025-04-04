import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className='--font-display flex h-[185px] w-full flex-col bg-(--color-blue) text-(--color-white)'>
      <div className='slogan m-auto mt-[48px] text-[48px] font-bold'>
        {'MUSIC LABEL MANAGER'}
      </div>
      <nav className='m-auto'>
        <ul className='mb-[40px] flex flex-row gap-[50px]'>
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
    </header>
  );
}
