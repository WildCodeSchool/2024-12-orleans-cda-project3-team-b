// pages/ArtistProfilePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArtistProfileCard from '@/components/artist-profile-card';

type ArtistHired = {
  artists_id: number;
  milestones_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  notoriety: number;
  genre_name: string;
  milestone_name: string;
};

export default function ArtistProfilePage() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const response = await fetch(`/api/artists-hired/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };

    void fetchArtistsHired();
  }, []);

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artists.map((artist) => (
        <ArtistProfileCard
          key={artist.artists_id}
          firstname={artist.firstname}
          lastname={artist.lastname}
          alias={artist.alias}
          image={artist.image}
          notoriety={artist.notoriety}
          genre_name={artist.genre_name}
          milestone_name={artist.milestone_name}
        />
      ))}
    </div>
  );
}
