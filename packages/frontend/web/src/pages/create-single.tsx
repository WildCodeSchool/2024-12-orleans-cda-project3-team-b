import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import MarketingCard from '@/components/marketing-card';
import type { Marketing } from '@/components/marketing-card';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';

export default function CreateSingle() {
  const [artistsHired, setArtistsHired] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [singleName, setSingleName] = useState('');
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);

    if (!selectedArtistId || !singleName.trim()) {
      return;
    }

    try {
      const res = await fetch('/api/singles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistHiredId: selectedArtistId,
          singleName: singleName.trim(),
          genreId: artistsHired.find(
            (a) => a.artist_hired_id === selectedArtistId,
          )?.genre_id,
        }),
      });

      if (!res.ok) {
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        if (selectedArtistId != null) {
          const resArtistHired = await fetch('/api/artists-hired');
          if (!resArtistHired.ok)
            throw new Error(`Artist fetch failed: ${resArtistHired.status}`);
          const artistsData: ArtistHired[] = await resArtistHired.json();
          const selectedArtistHired = artistsData.find(
            (a) => a.artist_hired_id === selectedArtistId,
          );
          setArtistsHired(selectedArtistHired ? [selectedArtistHired] : []);
        } else {
          setArtistsHired([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtistsHired([]);
      }
    };

    void fetchArtists();
  }, [selectedArtistId]);

  useEffect(() => {
    const fetchMarketing = async () => {
      try {
        if (selectedMarketingId != null) {
          const resMarketing = await fetch('/api/marketing');
          if (!resMarketing.ok)
            throw new Error(`Marketing fetch failed: ${resMarketing.status}`);
          const marketingData: Marketing[] = await resMarketing.json();
          const selectedMarketing = marketingData.find(
            (m) => m.id === selectedMarketingId,
          );
          setMarketing(selectedMarketing ? [selectedMarketing] : []);
        } else {
          setMarketing([]);
        }
      } catch (error) {
        console.error('Error fetching marketing:', error);
        setMarketing([]);
      }
    };

    void fetchMarketing();
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
          {artistsHired.length > 0 ? (
            artistsHired.map((artist) => (
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
            marketing.map((campaign) => (
              <MarketingCard key={campaign.id} marketing={campaign} />
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

        <div className='mt-6'>
          {hasTriedSubmit && (!selectedArtistId || !singleName.trim()) ? (
            <p className='text-center text-sm text-red-500'>
              {'Please select an artist and enter a name for the single.'}
            </p>
          ) : null}
        </div>

        {/* Buttons */}
        <div className='mt-12 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between'>
          <VerifyButton
            color='bg-secondary active:scale-95 transition-transform'
            image='/assets/not-check.png'
            onClick={async () => {
              await navigate(-1);
            }}
          >
            {'Cancel'}
          </VerifyButton>
          <VerifyButton
            color='bg-orange-500 active:scale-95 transition-transform'
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
