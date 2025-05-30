// pages/ArtistProfilePage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArtistProfileCard from '@/components/artist-profile-card';

export type Artist = {
  key: number;
  artists_id: number;
  milestones_id: number;
  firstname: string;
  lastname: string;
  alias: string;
  image: string;
  notoriety: number;
  genre_name: string;
  milestone_name: string;
  skills: [
    {
      name: string;
      grade: number;
      skills_id: number;
      artistsHiredSkillsId: number;
    },
  ];
  artistsHiredId: number;
};

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const response = await fetch(`/api/artists/${id}`);
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
  }, [id]);
  console.log(artists);

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artists.map((artist) => (
        <ArtistProfileCard key={artist.artists_id} artist={artist} />
      ))}
    </div>
  );
}
