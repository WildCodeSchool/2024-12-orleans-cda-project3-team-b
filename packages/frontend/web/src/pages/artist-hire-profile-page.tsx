// pages/ArtistProfilePage.tsx
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ArtistProfileCard from '@/components/artist-profile-card';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { InfoLabel } from '../../../../backend/api/src/games/label-info';
import type { Price } from '../../../../backend/api/src/games/price';

export default function ArtistHirePage() {
  const [artistsHired, setArtistsHired] = useState<ArtistHired[]>([]);
  const [price, setPrice] = useState<Price>();
  const [infoLabel, setInfoLabel] = useState<InfoLabel | null>(null);
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

  const fetchInfoLabel = async () => {
    try {
      const res = await fetch('/api/games/label');
      const data: InfoLabel = await res.json();
      setInfoLabel(data);
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };
  useEffect(() => {
    const fetchPriceSingle = async () => {
      try {
        const res = await fetch('/api/games/price-stats');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Price = await res.json();

        setPrice(data);
      } catch (error) {
        console.error('Error fetching single price:', error);
      }
    };

    void fetchInfoLabel();

    void fetchPriceSingle();
  }, []);
  const budget = infoLabel?.budget ?? 0;

  const isDisabledPrice = price?.price == null || budget < price.price;

  return (
    <div className='bg-primary flex flex-col items-center space-y-4 px-4 py-6'>
      {artistsHired.map((artist) => (
        <ArtistProfileCard
          key={artist.id}
          artist={artist}
          fetchArtistsHired={fetchArtistsHired}
          isAddButton
          price={price}
          isDisabled={isDisabledPrice}
          fetchInfoLabel={fetchInfoLabel}
        />
      ))}
    </div>
  );
}
