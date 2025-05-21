import { useEffect, useState } from 'react';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import AddSingle from '@/components/add-single';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import MarketingCard from '@/components/marketing-card';
import type { Marketing } from '@/components/modal-marketing';
import RemoveSingle from '@/components/remove-single';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from './main-menu';

export default function CreateAlbumMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const [marketing, setMarketing] = useState<Marketing[]>([]);

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const apiUrl = `/api/artists-hired`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ArtistHired[] = await response.json();

        if (selectedArtistId != null) {
          const selected = data.find(
            (artist) => artist.artists_id === selectedArtistId,
          );
          setArtists(selected ? [selected] : []);
        } else {
          setArtists([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      }
    };

    if (selectedArtistId != null) {
      void fetchArtistsHired();
    }
  }, [selectedArtistId]);

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        const apiUrl = `/api/marketing`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Marketing[] = await response.json();

        if (selectedMarketingId != null) {
          const selected = data.find(
            (marketing) => marketing.id === selectedMarketingId,
          );
          setMarketing(selected ? [selected] : []);
        } else {
          setMarketing([]);
        }
      } catch (error) {
        console.error('Error fetching marketing:', error);
        setMarketing([]);
      }
    };

    if (selectedMarketingId != null) {
      void fetchMarketing();
    }
  }, [selectedMarketingId]);

  return (
    <form action='' method='post'>
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <button type='button'>
            <ArrowLeft />
          </button>
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'RECORDING A NEW ALBUM'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img className='h-22 w-22' src='/assets/album.png' alt='' />
        <div className='mt-6'>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <ArtistCard key={artist.artists_id} artist={artist} />
            ))
          ) : (
            <p className='text-secondary text-s mt-4 text-center'>
              {'No artist selected'}
            </p>
          )}
          <AddArtist
            onArtistSelected={(id) => {
              setSelectedArtistId(id);
            }}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <ChooseName
            name={"Choose your album's name"}
            placeholder={"Album's name"}
          />
        </div>

        <div className='mt-12 flex w-full flex-col items-center gap-2'>
          <h2 className='text-secondary mb-2 text-center text-xl'>
            {'Choose 3 singles:'}
          </h2>
          <RemoveSingle />
          <AddSingle />
          <AddSingle />
        </div>
        <div className='mt-6'>
          {marketing.length > 0 ? (
            marketing.map((marketing) => (
              <MarketingCard
                key={marketing.id}
                id={marketing.id}
                name={marketing.name}
                bonus={marketing.bonus}
                price={marketing.price}
                image={marketing.image}
              />
            ))
          ) : (
            <p className='text-secondary text-s mt-4 text-center'>
              {'No Marketing Campaign selected'}
            </p>
          )}
          <AddMarketing
            onMarketingSelected={(id) => {
              setSelectedMarketingId(id);
            }}
          />
        </div>

        <div className='mt-12 flex items-center justify-between gap-x-16'>
          <VerifyButton color='bg-secondary' image='/assets/not-check.png'>
            {'Cancel'}
          </VerifyButton>
          <VerifyButton color='bg-orange-500' image='/assets/check.png'>
            {'Confirm'}
          </VerifyButton>
        </div>
      </div>
    </form>
  );
}
