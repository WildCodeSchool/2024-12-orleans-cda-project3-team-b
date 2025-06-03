// pages/ArtistProfilePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArtistProfileCard from '@/components/artist-profile-card';

import type { Artist } from './artist-profile-page';

type ArtistHired = Artist & {
  artistsHiredId: number;
  fetchArtistsHired: () => Promise<void>;
  isAddButton?: boolean;
};

export default function ArtistHirePage() {
  const [artistsHired, setArtistsHired] = useState<ArtistHired[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const response = await fetch(`/api/artists-hired/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        setArtistsHired(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    void fetchArtistsHired();
  }, [id]);

  //get out the fetch for refresh in props
  const fetchArtistsHired = async () => {
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
  };

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artistsHired.map((artist) => (
        <ArtistProfileCard
          key={artist.artists_id}
          artist={artist}
          fetchArtistsHired={fetchArtistsHired}
          isAddButton
        />
      ))}
    </div>
  );
}
