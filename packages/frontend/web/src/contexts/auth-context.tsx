import type { PropsWithChildren } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthProviderProps = PropsWithChildren<object>;
type AuthProviderState = {
  isLoading: boolean;
  setIsLoggedIn: (value: boolean) => void;
  isLoggedIn: boolean;
};
const authProviderContext = createContext<AuthProviderState | undefined>(
  undefined,
);
const API_URL = import.meta.env.VITE_API_URL;

export default function AuthContext({ children, ...props }: AuthProviderProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const go = async () => {
      const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
      const data = (await res.json()) as { ok: boolean };
      if (data.ok) {
        setIsLoggedIn(true);
      }
      setIsLoading(false);
    };
    void go();
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      setIsLoggedIn,
      isLoggedIn,
    }),
    [isLoading, isLoggedIn],
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
