import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import SeeMoreButton from '@/components/see-more-button';
import { useAuth } from '@/contexts/auth-context';
import { useLabel } from '@/contexts/label-context';

import type { Artist } from '../../../../backend/api/src/artists/artists';

export default function HireArtist() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [messageBudget, setMessageBudget] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const { label, refreshLabel } = useLabel();
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
    void fetchArtists();
  }, []);
  const handleSeeMore = () => {
    setVisibleCount((prev) => prev + 4);
  };
  const sortedArtists = [...artists].sort((a, b) =>
    sortOrder === 'asc' ? a.price - b.price : b.price - a.price,
  );
  const handleHireArtist = async (
    artist: Artist,
    labelId: number,
    budget: number,
  ) => {
    try {
      const userId = auth?.user?.id;
      const hireResponse = await fetch('/api/artists-hired', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistId: artist.id,
          skills: artist.skills,
          cost: artist.price,
          labelId,
          budget,
          userId,
        }),
      });
      if (!hireResponse.ok) {
        throw new Error(`Hire failed. Status: ${hireResponse.status}`);
      }
      setArtists((prev) => prev.filter((artist) => artist.id !== artist.id));
    } catch (error) {
      console.error('Error hiring artist:', error);
    }
  };

  const labelId = label?.id ?? 0;
  const budget = label?.budget ?? 0;

  return (
    <div className='flex min-h-screen flex-col items-center bg-white px-4 py-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <div>
          <ArrowLeft />
        </div>
        <h1 className='text-secondary text-center text-2xl font-bold underline underline-offset-4'>
          {'HIRE ARTISTS'}
        </h1>
        <div className='h-6 w-6' />
      </div>
      <div className='mb-8 flex flex-col text-xl font-medium text-teal-800'>
        {'ARTISTS'}
      </div>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
        {sortedArtists.slice(0, visibleCount).map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
            onHire={async () => {
              if (!labelId) {
                setMessageBudget('Label or budget info not loaded yet.');
                return;
              }
              try {
                await handleHireArtist(artist, labelId, budget);
                await navigate('/main-menu'); // only after successful hire
                await refreshLabel();
              } catch {
                setMessageBudget('redirection not working');
              }
            }}
            isOnFire
            isLink
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
