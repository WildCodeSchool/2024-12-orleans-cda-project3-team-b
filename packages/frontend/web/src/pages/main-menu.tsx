import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import ArtistCard from '@/components/artist-card';

import AddButton from '../components/add-button';

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

export default function MainMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const apiUrl = `/api/artists-hired`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        setArtists(data);
      } catch (error) {
        console.error('Error details:', error);
        setArtists([]); // Reset artists on error
      }
    };

    void fetchArtistsHired();
  }, []);

  return (
    <div className='bg-primary mx-auto pt-13 text-center'>
      <div className='flex h-70 flex-col items-center justify-center'>
        <h2 className='text-secondary pb-7 text-3xl underline'>
          {'MyARTISTS'}
        </h2>

        <div className='mt-5 grid grid-cols-2 gap-4'>
          {artists.slice(0, visibleCount).map((artist) => {
            return <ArtistCard key={artist.artist_id} artist={artist} />;
          })}
        </div>
        <Link to='/my-artists'>
          <button
            type='button'
            className='bg-secondary mt-5 mb-4 flex h-8 w-29 items-center justify-center rounded-sm text-xl text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
          >
            {'See full list'}
          </button>
        </Link>

        <Link to='/hire-artist'>
          <AddButton>{'+'}</AddButton>
        </Link>

        <h2 className='text-secondary pt-1 text-xl'>{'Hire a new artist'}</h2>
      </div>
      <div className='h-70 pt-7'>
        <h2 className='text-secondary mt-4 text-3xl underline'>{' RECORD'}</h2>

        <div className='flex h-50 items-center justify-center'>
          <div className='flex flex-col items-center justify-center'>
            <Link to={'/create-single-menu'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h2 className='text-secondary pt-1 text-xl'>
              {'Create a new single'}
            </h2>
          </div>
          <div className='flex flex-col items-center justify-center pl-10'>
            <Link to={'/create-album-menu'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary pt-1 text-xl'>
              {'Create a new album'}
            </h3>
          </div>
        </div>
      </div>
      <div className='h-70 pt-7'>
        <h2 className='text-secondary text-3xl underline'>{' STAFF'}</h2>
        <div className='flex h-50 items-center justify-center'>
          <div className='flex flex-col items-center justify-center pr-10 pl-10'>
            <Link to={'/hire-staff'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
          </div>
          <div className='flex flex-col items-center justify-center pr-10 pl-10'>
            <Link to={'/hire-staff'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
          </div>
          <div className='flex flex-col items-center justify-center pr-10 pl-10'>
            <Link to={'/hire-staff'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
          </div>
          <div className='flex flex-col items-center justify-center pr-10 pl-10'>
            <Link to={'/hire-staff'}>
              <AddButton>{'+'}</AddButton>
            </Link>
            <h3 className='text-secondary text-xl'>{'Hire staff'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
