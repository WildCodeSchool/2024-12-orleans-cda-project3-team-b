import { useEffect, useState } from 'react';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import MarketingCard from '@/components/marketing-card';
import type { Marketing } from '@/components/modal-marketing';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from './main-menu';

export default function CreateSingleMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [singleName, setSingleName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedArtistId || !singleName.trim()) {
      alert('Please select an artist and enter a name for your single.');
      return;
    }

    try {
      const res = await fetch('/api/singles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistId: selectedArtistId,
          singleName: singleName.trim(),
        }),
      });

      if (!res.ok) {
        alert('An error occurred while submitting the form.');
        return;
      }

      setSubmitted(true);

      console.log('Form submitted with:', {
        selectedArtistId,
        selectedMarketingId,
        singleName,
      });
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit. Please try again.');
    }
  };

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const response = await fetch('/api/artists-hired');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

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
        const response = await fetch('/api/marketing');
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data: Marketing[] = await response.json();

        if (selectedMarketingId != null) {
          const selected = data.find((m) => m.id === selectedMarketingId);
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
    <form>
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6 sm:px-6 md:px-12'>
        {/* Header */}
        <div className='mb-4 flex w-full flex-col items-center justify-between gap-2 sm:flex-row'>
          <button type='button'>
            <ArrowLeft />
          </button>
          <h1 className='text-secondary text-center text-xl font-bold sm:text-2xl'>
            {' RECORDING A NEW SINGLE'}
          </h1>
          <div className='h-6 w-6' />
        </div>

        {/* Image */}
        <img
          className='h-20 w-20 sm:h-28 sm:w-28'
          src='/assets/music-note.png'
          alt='note'
        />

        {/* Artist */}
        <div className='mt-6 w-full max-w-md'>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <ArtistCard key={artist.artists_id} artist={artist} />
            ))
          ) : (
            <p className='text-secondary mt-4 text-center text-sm'>
              {'No artist selected'}
            </p>
          )}
          <AddArtist
            onArtistSelected={(id) => {
              setSelectedArtistId(id);
            }}
          />
        </div>

        {/* Single name */}
        <div className='mt-6 flex w-full max-w-md flex-col items-center justify-center'>
          <ChooseName
            name="Choose your single's name"
            placeholder="Single's name"
            value={singleName}
            onChange={handleChange}
          />
        </div>

        {/* Marketing */}
        <div className='mt-6 w-full max-w-md'>
          {marketing.length > 0 ? (
            marketing.map((m) => (
              <MarketingCard
                key={m.id}
                id={m.id}
                name={m.name}
                bonus={m.bonus}
                price={m.price}
                image={m.image}
              />
            ))
          ) : (
            <p className='text-secondary mt-4 text-center text-sm'>
              {'No Marketing Campaign selected'}
            </p>
          )}
          <AddMarketing
            onMarketingSelected={(id) => {
              setSelectedMarketingId(id);
            }}
          />
        </div>

        {/* Buttons */}
        <div className='mt-12 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between'>
          <VerifyButton color='bg-secondary' image='/assets/not-check.png'>
            {'Cancel'}
          </VerifyButton>
          <VerifyButton
            color='bg-orange-500'
            image='/assets/check.png'
            onClick={handleSubmit}
          >
            {'Confirm'}
          </VerifyButton>
        </div>
      </div>
    </form>
  );
}
