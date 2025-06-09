import { log } from 'console';
import { useEffect, useState } from 'react';

import { ArrowLeft } from '@/components/arrow-left';
import { GoBackToMenu } from '@/components/go-back-to-menu';

import type { Albums } from '../../../../backend/api/src/albums/albums';
import type { SinglesAlbums } from '../../../../backend/api/src/singles-albums.ts/singles-albums';

export default function AlbumCongratulations() {
  const [albums, setAlbums] = useState<Albums[]>([]);
  const [singlesAlbums, setSinglesAlbums] = useState<SinglesAlbums[]>([]);

  // Fetch albums
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
        setAlbums([]);
      }
    };

    void fetchAlbums();
  }, []);

  // Fetch singles of first album
  useEffect(() => {
    const fetchSinglesAlbums = async () => {
      if (albums.length === 0) return;

      const sortedAlbums = [...albums].sort((a, b) => b.id - a.id);
      const albumId = sortedAlbums[0].id;

      try {
        const response = await fetch(`/api/singles-albums/${albumId}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setSinglesAlbums(data);
      } catch (error) {
        console.error('Error fetching singles:', error);
        setSinglesAlbums([]);
        console.log(setSinglesAlbums);
      }
    };

    void fetchSinglesAlbums();
  }, [albums]);

  const sortedAlbums = [...albums].sort((a, b) => b.id - a.id);
  const album = sortedAlbums[0];

  return (
    <div className='mt-5 flex flex-col items-center'>
      <h1 className='text-secondary text-2xl font-bold'>
        {'CONGRATULATIONS!!! 🎊'}
      </h1>

      <h2 className='text-secondary mt-2 text-xl'>
        {album
          ? `${album.artist_alias ?? `${album.artist_firstname} ${album.artist_lastname}`} just made a new album!`
          : 'An artist just made a new album!'}
      </h2>

      <div className='mt-10 flex flex-col items-center'>
        <h3 className='text-secondary text-2xl'>
          {album ? album.album_name : 'Album Name'}
        </h3>
        <p className='text-secondary text-sm font-light'>
          {'by '}
          {album
            ? (album.artist_alias ??
              `${album.artist_firstname} ${album.artist_lastname}`)
            : 'Unknown Artist'}
        </p>
        <img
          className='mt-4 h-22 w-22'
          src='/assets/album.png'
          alt='album cover'
        />
      </div>
      <div className='mt-6 items-center'>
        <div className='mb-2 flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'Your reputation is now:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {album.notoriety_gain ?? 0}
            <img
              className='ml-1 h-6 w-6'
              src='/assets/star-sign.png'
              alt='star sign'
            />
          </h3>
        </div>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'You just earned:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {'$'}
            {album.money_earned ?? 0}
            <img
              className='mt-0.5 h-5 w-6 pl-1'
              src='/assets/dollar-icon.png'
              alt='dollar icon'
            />
          </h3>
        </div>
      </div>

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
