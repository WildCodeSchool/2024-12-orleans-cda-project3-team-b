import { useState } from 'react';

import DesktopNav from './desktop-nav';
import LogoSection from './logo-section';
import MobileMenuToggle from './mobile-menu-toggle';
import MobileNav from './mobile-nav';
import StatusSection from './status-section';

export default function HeaderInGame() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className='border-b-orange bg-secondary relative flex h-20 w-full items-center justify-between border-b-3 text-white'>
      <LogoSection />
      <StatusSection />
      <DesktopNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileMenuToggle isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileNav isOpen={isOpen} closeMenu={closeMenu} />
    </header>
  );
}
