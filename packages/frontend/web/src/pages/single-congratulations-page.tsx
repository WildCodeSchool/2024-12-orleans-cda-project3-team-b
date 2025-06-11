import { useEffect, useState } from 'react';

import { GoBackToMenu } from '@/components/go-back-to-menu';

import type { Single } from '../../../../backend/api/src/singles/singles';

export default function SingleCongratulations() {
  const [singles, setSingles] = useState<Single[]>([]);
  // Fetch albums
  useEffect(() => {
    const fetchSingles = async () => {
      try {
        const response = await fetch('/api/singles');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSingles(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setSingles([]);
      }
    };

    void fetchSingles();
  }, []);
  // Fetch singles of first single

  const sortedSingles = [...singles].sort((a, b) => b.id - a.id);
  const single = sortedSingles[0];

  if (!single) {
    return (
      <div className='mt-10 text-center'>
        <p className='text-secondary'>{'Loading your single...'}</p>
      </div>
    );
  }

  return (
    <div className='mt-5 flex flex-col items-center'>
      <h1 className='text-secondary text-2xl font-bold'>
        {'CONGRATULATIONS!!! 🎊'}
      </h1>

      <h2 className='text-secondary mt-2 text-xl'>
        {single
          ? `${single.artist_alias ?? `${single.artist_firstname} ${single.artist_lastname}`} just made a new single!`
          : 'An artist just made a new single!'}
      </h2>

      <div className='mt-10 flex flex-col items-center'>
        <h3 className='text-secondary text-2xl'>
          {single ? single.name : 'Album Name'}
        </h3>
        <p className='text-secondary text-sm font-light'>
          {'by '}
          {single
            ? (single.artist_alias ??
              `${single.artist_firstname} ${single.artist_lastname}`)
            : 'Unknown Artist'}
        </p>
        <img
          className='mt-4 h-22 w-22'
          src='/assets/music-note.png'
          alt='single cover'
        />
      </div>
      <div className='mt-6 items-center'>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'You just earned:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {single.money_earned}
            <img
              className='mt-1.5 h-3.5 w-4'
              src='/assets/dollar-icon.png'
              alt='dollar icon'
            />
          </h3>
        </div>
      </div>
      <div className='flex items-center'>
        <GoBackToMenu />
      </div>
    </div>
  );
}
