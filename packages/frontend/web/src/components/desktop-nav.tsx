import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

import type { Info } from './status-section';

type DesktopNavProps = {
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
};

export default function DesktopNav({ isOpen, setIsOpen }: DesktopNavProps) {
  const [labelInfo, setLabelInfo] = useState<Info>();
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const apiUrl = '/api/games/label';
        const response = await fetch(apiUrl);
        const data = await response.json();

        setLabelInfo(data);
      } catch (error) {
        console.error('Error details:', error);
      }
    };

    void fetchLabels();
  }, []);

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
    <nav className='hidden items-center md:flex'>
      <ul className='flex items-center justify-end space-x-4 text-xl font-bold'>
        <div className={labelInfo?.id != null ? 'hidden' : 'flex gap-4'}>
          <li>
            <Link to='/my-artists'>{'MyArtists'}</Link>
          </li>
          <li>
            <Link to=''>{'MyAlbums'}</Link>
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
        <li>
          <Link to=''>{'Profile'}</Link>
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
