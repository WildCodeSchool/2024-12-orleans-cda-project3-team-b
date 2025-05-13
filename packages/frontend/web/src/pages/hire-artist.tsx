import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { ArrowLeft } from '@/components/arrow-left';
import SeeMoreButton from '@/components/see-more';

type Artist = {
  artist_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  genre_name: string;
  notoriety: number;
  price: number;
};

const publicKey = import.meta.env.VITE_API_URL;

export default function HireArtist() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const apiUrl = `${publicKey}/artists`;

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

    void fetchArtists();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const sortedArtists = [...artists].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
  );

  const handleHireArtist = async (artistId: number) => {
    try {
      const hireResponse = await fetch(`${publicKey}/routes/artists-hired`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistId }),
      });

      if (!hireResponse.ok) {
        throw new Error(`Hire failed. Status: ${hireResponse.status}`);
      }

      setArtists((prev) =>
        prev.filter((artist) => artist.artist_id !== artistId),
      );
    } catch (error) {
      console.error('Error hiring artist:', error);
      alert('Error hiring artist. Please try again.');
    }
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button'>
          <ArrowLeft />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE ARTISTS'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        {sortedArtists.slice(0, visibleCount).map((artist) => {
          return (
            <div
              key={artist.artist_id}
              className='bg-secondary flex h-20 w-110 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
            >
              <img
                className='h-16 w-16 rounded-4xl'
                src={`/assets/${artist.image}`}
                alt=''
              />
              <span className='flex flex-col items-center'>
                <h2 className='ml-2'>
                  {artist.firstname} {artist.lastname} {artist.alias}
                </h2>
                <h3>{artist.genre_name}</h3>
              </span>
              <span className='flex items-center'>
                <h2 className='flex items-center font-bold'>
                  {artist.notoriety}
                </h2>
                <img
                  className='mt-0.5 h-5 w-5'
                  src='/assets/star-sign.png'
                  alt=''
                />
              </span>
              <span className='flex flex-col items-center'>
                <button
                  key={artist.artist_id}
                  type='button'
                  onClick={() => handleHireArtist(artist.artist_id)}
                  className='flex h-8 w-18 items-center justify-center rounded-sm bg-orange-500 pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
                >
                  {' Hire '}
                  <img
                    className='h-7 w-7'
                    src='/assets/sign.png'
                    alt='contract logo'
                  />
                </button>

                <span className='flex items-center'>
                  <h2 className='flex items-center font-bold'>
                    {artist.price}
                  </h2>
                  <img
                    className='mt-0.5 h-3.5 w-3.5'
                    src='/assets/dollar-icon.png'
                    alt=''
                  />
                </span>
              </span>
            </div>
          );
        })}
      </div>
      <SeeMoreButton onClick={handleSeeMore}> {'See More'}</SeeMoreButton>
    </div>
  );
}
