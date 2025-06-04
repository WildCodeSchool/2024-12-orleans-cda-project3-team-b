// pages/ArtistProfilePage.tsx
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArtistProfileCard from '@/components/artist-profile-card';

import type { HiredArtist } from '../../../../backend/api/src/artists-hired/artists-hired';

export default function ArtistHirePage() {
  const [artistsHired, setArtistsHired] = useState<HiredArtist[]>([]);
  const { id } = useParams<{ id: string }>();

  const fetchArtistsHired = useCallback(async () => {
    try {
      const response = await fetch(`/api/artists-hired/${id}`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      setArtistsHired(data);
    } catch (error) {
      console.error('Error fetching artists:', error);
      setArtistsHired([]);
    }
  }, [id]);

  useEffect(() => {
    (async () => {
      await fetchArtistsHired();
    })();
  }, [fetchArtistsHired, id]);

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artistsHired.map((artist) => (
        <ArtistProfileCard
          key={artist.id}
          artist={artist}
          fetchArtistsHired={fetchArtistsHired}
          isAddButton
        />
      ))}
    </div>
  );
}
