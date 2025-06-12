import { useEffect, useState } from 'react';

import Congratulations from '@/components/congratulations';
import { GoBackToMenu } from '@/components/go-back-to-menu';

import type { Album } from '../../../../backend/api/src/albums/albums';
import type { SingleAlbum } from '../../../../backend/api/src/albums/albums';

export default function AlbumCongratulations() {
  const [items, setItems] = useState<Album>();
  const [singlesAlbums, setSinglesAlbums] = useState<SingleAlbum[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums/filter');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setItems(undefined);
      }
    };

    void fetchAlbums();
  }, []);

  useEffect(() => {
    const fetchSinglesAlbums = async () => {
      if (!items) return;
      const albumId = items.id;
      try {
        const response = await fetch(`/api/singles-albums/${albumId}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSinglesAlbums(data);
      } catch (error) {
        console.error('Error fetching singles:', error);
        setSinglesAlbums([]);
      }
    };

    void fetchSinglesAlbums();
  }, [items]);

  if (!items) {
    return (
      <div className='mt-10 text-center'>
        <p className='text-secondary'>{'album not found'}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <Congratulations items={items} text={'album'} />
      <div className='bg-secondary mt-6 flex w-full max-w-md flex-col items-center rounded-xl p-4'>
        <h2 className='text-primary mb-2 font-bold'>{'Singles'}</h2>
        {singlesAlbums.length === 0 ? (
          <p className='text-primary'>{'No singles for this album.'}</p>
        ) : (
          singlesAlbums.map((single) => (
            <p key={single.singles_id} className='text-primary'>
              {single.single_name}
            </p>
          ))
        )}
      </div>
      <div className='flex items-center'>
        <GoBackToMenu />
      </div>
    </div>
  );
}
