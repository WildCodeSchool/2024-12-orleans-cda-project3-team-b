import RegisterLabel from '@/components/register-label';
import { useAuth } from '@/contexts/auth-context';

export default function HomeGame() {
  const auth = useAuth();
  const logout = async () => {
    const res = await fetch(`/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = (await res.json()) as { ok: boolean };
    if (data.ok) {
      auth?.setIsLoggedIn(false);
    }
  };

  return (
    <>
      <button
        type='button'
        className='rounded-md bg-gray-500 text-center'
        onClick={logout}
      >
        {'deconnected'}
      </button>
      <RegisterLabel />
    </>
  );
}
