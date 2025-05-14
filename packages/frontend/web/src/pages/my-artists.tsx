import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import ArtistCard from '@/components/artist-card';
import SeeMoreButton from '@/components/see-more-button';

import { ArrowLeft } from '../components/arrow-left';

const publicKey = import.meta.env.VITE_API_URL;

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

export default function MyArtists() {
  const navigate = useNavigate();
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const apiUrl = `${publicKey}/artists-hired`;

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

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button'>
          <ArrowLeft />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'MyArtists'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>
      <div className='mt-5 grid grid-cols-2 gap-4'>
        {artists.slice(0, visibleCount).map((artist) => {
          return <ArtistCard key={artist.artist_id} artist={artist} />;
        })}
      </div>
      <SeeMoreButton onClick={handleSeeMore}> {'See More'}</SeeMoreButton>
    </div>
  );
}
