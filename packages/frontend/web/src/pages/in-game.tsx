import { Navigate, Outlet } from 'react-router-dom';

import HeaderInGame from '@/components/header-in-game';
import { useAuth } from '@/contexts/auth-context';
import { LabelProvider } from '@/contexts/label-context';

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
    <LabelProvider>
      <HeaderInGame />
      <Outlet />
    </LabelProvider>
  );
}
