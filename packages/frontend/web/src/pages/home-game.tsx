import { useAuth } from '@/contexts/auth-context';

const API_URL = import.meta.env.VITE_API_URL;
export default function HomeGame() {
  const auth = useAuth();

  const logout = async () => {
    const res = await fetch(`${API_URL}/auth/logout`, {
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
      <p>{'home Game'}</p>
      <button
        type='button'
        className='rounded-md bg-gray-500 text-center'
        onClick={logout}
      >
        {'deconnected\r'}
      </button>
    </>
  );
}
