import { Navigate, Outlet } from 'react-router-dom';

import HeaderDesktop from '@/components/header-desktop';
import { useAuth } from '@/contexts/auth-context';

export default function InGame() {
  const auth = useAuth();
  const isLoading = auth?.isLoading;
  const isLoggedIn = auth?.isLoggedIn;
  if (isLoading ?? false) {
    return;
  }
  if (!(isLoggedIn ?? false)) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <HeaderDesktop />
      <Outlet />
    </>
  );
}
