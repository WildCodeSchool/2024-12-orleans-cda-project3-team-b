import { useEffect, useState } from 'react';

import { ArrowLeft } from '@/components/arrow-left';

import type { Album } from '../../../../backend/api/src/albums/albums';

export default function MyAlbums() {
  const [visibleCount, setVisibleCount] = useState(4);
  const [albums, setAlbums] = useState<Album[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const apiUrl = `/api/albums`;
        const response = await fetch(apiUrl);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error details:', error);
        setAlbums([]);
      }
    };
    void fetchAlbums();
  }, []);

  const totalMoney = albums.reduce((sum, album) => sum + album.money_earned, 0);
  const averageNotoriety =
    albums.length > 0
      ? Math.round(
          albums.reduce((sum, album) => sum + album.notoriety_gain, 0) /
            albums.length,
        )
      : 0;

  return (
    <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button'>
          <ArrowLeft />
        </button>
        <div className='flex flex-col items-center'>
          <img className='h-22 w-22' src='/assets/album.png' alt='' />
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'MyAlbums'}
          </h1>
        </div>
        <div className='h-6 w-6' />
      </div>

      <div className='text-secondary mt-4 mb-8 flex flex-col items-center text-xl font-semibold'>
        <div className='flex items-center'>
          <h2>{'Total notoriety gain:'}</h2>
          <h3 className='ml-2 flex items-center text-xl font-bold'>
            {averageNotoriety}
          </h3>
          <img className='mt-0.5 h-6 w-6' src='/assets/star-sign.png' alt='' />
        </div>
        <div className='flex items-center'>
          <h2>{'Total earned money:'}</h2>
          <h3 className='ml-2 flex items-center text-xl font-bold'>
            {totalMoney.toLocaleString()}
          </h3>
          <img
            className='mt-0.5 h-4 w-4'
            src='/assets/dollar-icon.png'
            alt=''
          />
        </div>
      </div>

      <div className='bg-secondary flex w-84 flex-col items-center gap-4 rounded-xl p-4 text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
        <h2 className='font-bold'>{'ALBUMS'}</h2>
        {albums.slice(0, visibleCount).map((album) => (
          <div key={album.id} className='text-center'>
            <h3 className='font-semibold'>{album.albumName}</h3>
            <p className='text-sm font-light'>
              {'by '}
              {(album.alias ?? null) != null
                ? album.alias
                : `${album.firstname} ${album.lastname}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
