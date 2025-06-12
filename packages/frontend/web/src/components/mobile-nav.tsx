import { Link } from 'react-router-dom';

type MobileNavProps = {
  readonly isOpen: boolean;
  readonly closeMenu: () => void;
};
export default function MobileNav({ isOpen, closeMenu }: MobileNavProps) {
  return (
    <nav
      className={`bg-blue absolute top-18 z-3 h-50 w-full items-start justify-center text-xl shadow-[0_5px_5px_rgba(0,0,0,0.25)] ${isOpen ? 'flex' : 'hidden'}`}
    >
      <ul onClick={closeMenu} className='mt-3 w-full space-y-2 text-center'>
        <li>
          <Link to='/my-artists'>{'MyArtists'}</Link>
        </li>
        <li>
          <Link to='/my-albums'>{'MyAlbums'}</Link>
        </li>
        <li>
          <Link to=''>{'Legal Mentions'}</Link>
        </li>
        <li>
          <Link to=''>{'Confidentiality policy'}</Link>
        </li>
        <li className='flex items-center justify-center space-x-2'>
          <Link to=''>
            <img className='w-8' src='/assets/log-out.png' alt='log out logo' />
          </Link>
          <Link to=''>{'Log out'}</Link>
        </li>
      </ul>
    </nav>
  );
}
