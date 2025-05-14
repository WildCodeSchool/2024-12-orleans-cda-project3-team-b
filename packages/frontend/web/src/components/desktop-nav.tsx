import { Link } from 'react-router-dom';

type DesktopNavProps = {
  readonly isOpen: boolean;
  readonly setIsOpen: (open: boolean) => void;
};

export default function DesktopNav({ isOpen, setIsOpen }: DesktopNavProps) {
  return (
    <nav className='hidden items-center md:flex'>
      <ul className='flex items-center justify-end space-x-4 text-xl font-bold'>
        <li>
          <Link to='/my-artists'>{'MyArtists'}</Link>
        </li>
        <li>
          <Link to=''>{'MyAlbums'}</Link>
        </li>
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
          <Link to=''>
            <img className='w-8' src='/assets/log-out.png' alt='log out logo' />
          </Link>
          <Link to=''>{'Log out'}</Link>
        </li>
      </ul>
    </nav>
  );
}
