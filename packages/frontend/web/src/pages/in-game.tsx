import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/auth-context';

export default function InGame() {
  const auth = useAuth();
  const isLoading = auth?.isLoading;
  const isLoggedIn = auth?.isLoggedIn;
  if (isLoading) {
    return;
  }
  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
}
