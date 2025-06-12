import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

type MobileNavProps = {
  readonly isOpen: boolean;
  readonly closeMenu: () => void;
};
export default function MobileNav({ isOpen, closeMenu }: MobileNavProps) {
  const auth = useAuth();

  const logout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    const data = (await res.json()) as { ok: boolean };
    if (data.ok) {
      auth?.setIsLoggedIn(false);
      auth?.setUser(undefined);
    }
  };
  return (
    <nav
      className={`bg-blue absolute top-18 z-3 h-62 w-full items-start justify-center text-2xl shadow-[0_5px_5px_rgba(0,0,0,0.25)] ${isOpen ? 'flex' : 'hidden'}`}
    >
      <ul onClick={closeMenu} className='w-full space-y-2 text-center'>
        <li>
          <Link to='/my-artists'>{'MyArtists'}</Link>
        </li>
        <li>
          <Link to=''>{'MyAlbums'}</Link>
        </li>
        <li>
          <Link to=''>{'Legal Mentions'}</Link>
        </li>
        <li>
          <Link to=''>{'Confidentiality policy'}</Link>
        </li>
        <li>
          <Link to=''>{'Profile'}</Link>
        </li>
        <li className='flex items-center justify-center'>
          <div onClick={logout} className='flex'>
            <img className='w-8' src='/assets/log-out.png' alt='log out logo' />
            {'Log out'}
          </div>
        </li>
      </ul>
    </nav>
  );
}
