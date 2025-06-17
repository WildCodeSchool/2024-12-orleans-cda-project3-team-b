import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ArrowLeft } from '@/components/arrow-left';
import ArtistProfileCard from '@/components/artist-profile-card';

import type { Artist } from '../../../../backend/api/src/artists/artists';

export default function ArtistPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    const fetchArtists = async () => {
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

    void fetchArtists();
  }, [id]);

  return (
    <div className='bg-primary h-150 flex-col items-center'>
      <div className='flex items-center justify-center pt-3 md:ml-4 md:justify-start'>
        <ArrowLeft />
      </div>
      <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
        {artists.map((artist) => (
          <ArtistProfileCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
