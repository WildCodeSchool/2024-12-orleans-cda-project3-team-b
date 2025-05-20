import { useEffect, useState } from 'react';

import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import SeeMoreButton from '@/components/see-more-button';
import { ArrowLeft } from '../components/arrow-left';


type ArtistHired = {
  artists_id: number;
  milestones_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  notoriety: number;
  genre_name: string;
};

export default function MyArtists() {
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

        const data: ArtistHired[] = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };

    void fetchArtistsHired();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
      {/* Header */}
      <div className='mb-4 flex w-full items-center justify-between'>
        <button type='button'>
          <ArrowLeft />
        </button>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {' My Artists'}
        </h1>
        <div className='h-6 w-6' />
      </div>

      {/* Title */}
      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>

      {/* Artist grid */}
      <div className='mt-5 grid grid-cols-2 gap-4'>
        {artists.slice(0, visibleCount).map((artist) => (
          <div key={artist.artists_id}>
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>

      {/* See More */}
      {visibleCount < artists.length && (
        <SeeMoreButton onClick={handleSeeMore}>{'See More'}</SeeMoreButton>
      )}
    </div>
  );
}
