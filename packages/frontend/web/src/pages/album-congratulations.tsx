import { useEffect, useState } from 'react';

type ArtistHired = {
  artist_id: number;
  milestones_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  notoriety: number;
  genre_name: string;
};

export default function AlbumCongratulations() {
  const [albums, setAlbums] = useState<ArtistHired[]>([]);
  const [singles, setSingles] = useState<ArtistHired[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };
    const fetchSingles = async () => {
      try {
        const response = await fetch('/api/singles-albums');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };

    void fetchAlbums();
    void fetchSingles();
  }, []);
  return (
    <div className='mt-5 flex flex-col items-center'>
      <h1 className='text-secondary text-2xl font-bold'>
        {'CONGRATULATIONS!!!🎊'}
      </h1>
      <h2 className='text-secondary text-xl'>
        {'artists.name'} {'just made a new album'}
      </h2>
      <div className='mt-10 flex flex-col items-center'>
        <h3 className='text-secondary text-2xl'> {'Album.name'}</h3>
        <img className='h-22 w-22' src='/assets/album.png' alt='' />
      </div>
      <div className='mt-3 items-center'>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'Your reputation is now:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {'notoriety'}
            <img
              className='h-6 w-6'
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
            {'money'}
            <img
              className='mt-0.5 h-5 w-6 pl-1'
              src='/assets/dollar-icon.png'
              alt='star sign'
            />
          </h3>
        </div>
      </div>
      <div className='bg-secondary mt-6 flex h-40 w-100 flex-col items-center rounded-xl'>
        <h2 className='text-primary font-bold'>{'Singles'}</h2>
      </div>
    </div>
  );
}
