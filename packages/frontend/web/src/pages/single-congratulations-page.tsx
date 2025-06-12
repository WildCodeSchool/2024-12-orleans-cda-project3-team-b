import { useEffect, useState } from 'react';

import Congratulations from '@/components/congratulations';
import { GoBackToMenu } from '@/components/go-back-to-menu';

import type { Single } from '../../../../backend/api/src/singles/singles';

export default function SingleCongratulations() {
  const [items, setItems] = useState<Single>();
  // Fetch albums
  useEffect(() => {
    const fetchSingles = async () => {
      try {
        const response = await fetch('/api/singles/filter');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching singles:', error);
        setItems(undefined);
      }
    };

    void fetchSingles();
  }, []);

  if (!items) {
    return (
      <div className='mt-10 text-center'>
        <p className='text-secondary'>{'single not found'}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <Congratulations text={'single'} items={items} />

      <div>
        <GoBackToMenu />
      </div>
    </div>
  );
}
