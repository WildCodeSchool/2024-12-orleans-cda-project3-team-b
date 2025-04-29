import { Outlet } from 'react-router-dom';

import Header from '@/components/header';

export default function App() {
  return (
    // en attente du header
    <>
      <Header />
      <Outlet />
    </>
  );
}
