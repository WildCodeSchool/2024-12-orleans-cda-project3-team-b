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
  skills: [{ name: string; grade: number }];
  artistsHiredId: number;
  skillId: number;
  grade: number;
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
        console.log(data);

        setArtistsHired(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtistsHired([]);
      }
    };

    void fetchArtistsHired();
  }, []);
  // console.log(artistsHired);

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artistsHired.map((artist) => (
        <ArtistProfileCard
          key={artist.artists_id}
          firstname={artist.firstname}
          lastname={artist.lastname}
          alias={artist.alias}
          image={artist.image}
          notoriety={artist.notoriety}
          genre_name={artist.genre_name}
          milestone_name={artist.milestone_name}
          skills={artist.skills}
          artistsHiredId={artist.artistsHiredId}
          skillId={artist.skillId}
          isAddButton
        />
      ))}
    </div>
  );
}
