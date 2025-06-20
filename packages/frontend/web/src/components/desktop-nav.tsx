import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';
import { useLabel } from '@/contexts/label-context';

type DesktopNavProps = {
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
};

export default function DesktopNav({ isOpen, setIsOpen }: DesktopNavProps) {
  const { label } = useLabel();

  const auth = useAuth();
  const logout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    const data = (await res.json()) as { ok: boolean };
    if (data.ok) {
      auth?.setIsLoggedIn(false);
      auth?.setUser(undefined);
    }
  };
  return (
    <nav className='hidden items-center md:flex'>
      <ul className='flex items-center justify-end space-x-4 text-xl font-bold'>
        <div className={label?.id !== null ? 'flex gap-4' : 'hidden'}>
          <li>
            <Link to='/my-artists'>{'MyArtists'}</Link>
          </li>
          <li>
            <Link to='/my-albums'>{'MyAlbums'}</Link>
          </li>
        </div>
        <li>
          <img
            className='w-10 cursor-pointer'
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            src='/assets/dots.png'
            alt='three dots menu'
          />
        </li>
      </ul>

      <ul
        onClick={() => {
          setIsOpen(false);
        }}
        className={`${isOpen ? 'absolute' : 'hidden'} bg-secondary top-18 right-0 w-45 pl-1 font-bold`}
      >
        <li>
          <Link to=''>{'Legal Mentions'}</Link>
        </li>
        <li>
          <Link to=''>{'Confidentiality policy'}</Link>
        </li>
        <li className='flex items-center'>
          <div onClick={logout}>
            <img className='w-8' src='/assets/log-out.png' alt='log out logo' />
            {'Log out'}
          </div>
        </li>
      </ul>
    </nav>
  );
}
