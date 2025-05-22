import { useEffect, useState } from 'react';

import { ArrowLeft } from '@/components/arrow-left';
import ArtistCardHire from '@/components/artist-card-hire';
import SeeMoreButton from '@/components/see-more-button';
import { useAuth } from '@/contexts/auth-context';

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

export type InfoLabel = {
  label: number;
  budget: number;
};

export default function HireArtist() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [infoLabel, setInfoLabel] = useState<InfoLabel | null>(null);
  const [messageBudget, setMessageBudget] = useState('');
  const auth = useAuth();
  const labelId = infoLabel?.label;
  const budget = infoLabel?.budget ?? 0;

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const apiUrl = '/api/artists';

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

    const fetchBudget = async () => {
      try {
        const res = await fetch('/api/games/label');
        const data = await res.json();
        setInfoLabel(data);
      } catch (err) {
        console.error('Error fetching budget:', err);
      }
    };
    void fetchArtists();
    void fetchBudget();
  }, []);

  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const sortedArtists = [...artists].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
  );

  const handleHireArtist = async (
    artistId: number,
    price: number,
    labelId: number,
    budget: number,
  ) => {
    try {
      const hireResponse = await fetch('/api/artists-hired', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistId, cost: price, labelId, budget }),
      });

      if (!hireResponse.ok) {
        throw new Error(`Hire failed. Status: ${hireResponse.status}`);
      }

      setArtists((prev) =>
        prev.filter((artist) => artist.artist_id !== artistId),
      );

      const userId = auth?.user?.id;

      const updateBudget = await fetch('/api/artists_hired', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ cost: price, userId }),
      });

      if (!updateBudget.ok) {
        throw new Error(`Hire failed. Status: ${updateBudget.status}`);
      }
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
        {sortedArtists.slice(0, visibleCount).map((artist) => (
          <ArtistCardHire
            key={artist.artist_id}
            artist={artist}
            onHire={() => {
              if (labelId === undefined) {
                setMessageBudget('Label or budget info not loaded yet.');
                return;
              }
              void handleHireArtist(
                artist.artist_id,
                artist.price,
                labelId,
                budget,
              );
            }}
            budget={budget}
          />
        ))}
      </div>
      <SeeMoreButton onClick={handleSeeMore}> {'See More'}</SeeMoreButton>

      {messageBudget ? (
        <div className='mb-4 text-sm font-medium text-red-600'>
          {messageBudget}
        </div>
      ) : null}
    </div>
  );
}
