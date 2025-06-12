import type { PropsWithChildren } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import type { InfoLabel } from '../../../../backend/api/src/games/label-info';

type LabelContextType = {
  label: InfoLabel | null;
  refreshLabel: () => Promise<void>;
};

const LabelContext = createContext<LabelContextType | undefined>(undefined);

export function LabelProvider({ children }: PropsWithChildren<object>) {
  const [label, setLabel] = useState<InfoLabel | null>(null);

  const fetchLabel = useCallback(async () => {
    try {
      const res = await fetch('/api/games/label');
      const data = await res.json();
      setLabel(data);
    } catch (error) {
      console.error('Error fetching label:', error);
    }
  }, []);

  useEffect(() => {
    void fetchLabel();
  }, [fetchLabel]);

  const value = useMemo(
    () => ({ label, refreshLabel: fetchLabel }),
    [label, fetchLabel],
  );

  return (
    <LabelContext.Provider value={value}>{children}</LabelContext.Provider>
  );
}

export function useLabel() {
  const context = useContext(LabelContext);
  if (context === undefined) {
    throw new Error('useLabel must be used within a LabelProvider');
  }
  return context;
}
