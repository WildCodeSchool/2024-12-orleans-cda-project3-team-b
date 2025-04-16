import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type User = { id: number; email: string };
type AuthProviderProps = PropsWithChildren<object>;
type AuthProviderState = {
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
  setUser: (value: User) => void;
  user: User | undefined;
};
const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);
const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const go = async () => {
      const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
      const data = (await res.json()) as { ok: boolean; user: User };
      if (data.ok) {
        setIsLoggedIn(true);
        setUser(data.user);
      }
      setIsLoading(false);
    };
    void go();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoggedIn,
      setUser,
      user,
      isLoggedIn,
    }),
    [isLoading, isLoggedIn, user],
  );
  return (
    <authProviderContext.Provider {...props} value={value}>
      {children}
    </authProviderContext.Provider>
  );
}
export function useAuth() {
  const ctx = useContext(authProviderContext);
  return ctx;
}
