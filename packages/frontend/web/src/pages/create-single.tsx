import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import MarketingCard from '@/components/marketing-card';
import VerifyButton from '@/components/verify-button';
import { useLabel } from '@/contexts/label-context';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { Price } from '../../../../backend/api/src/games/price';
import type { Marketing } from '../../../../backend/api/src/marketing/marketing';

export default function CreateSingle() {
  const [artistsHired, setArtistsHired] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [singleName, setSingleName] = useState('');
  const [price, setPrice] = useState<Price>();
  const [messageError, setMessageError] = useState('');
  const selectedArtist = artistsHired.find((a) => a.id === selectedArtistId);
  const selectedSkills = selectedArtist?.skills ?? [];
  const { label, refreshLabel } = useLabel();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessageError('');
    if (selectedArtistId === null || !singleName.trim()) {
      setMessageError(
        'Please select an artist and enter a name for the single.',
      );
      return;
    }
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/singles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artistHiredId: selectedArtistId,
          singleName: singleName.trim(),
          genreId: artistsHired.find((a) => a.id === selectedArtistId)
            ?.genre_id,
          price: price?.price,
          skills: selectedSkills,
        }),
      });

      if (!res.ok) {
        setMessageError('Failed to create the single.');
        setIsSubmitting(false);
        return;
      }
      await refreshLabel();
      await navigate('/single-congrats');
    } catch (error) {
      console.error('Submission failed:', error);
      setIsSubmitting(false);
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
            (a) => a.id === selectedArtistId,
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

  useEffect(() => {
    const fetchPriceSingle = async () => {
      try {
        const res = await fetch('/api/games/price-singles');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Price = await res.json();

        setPrice(data);
      } catch (error) {
        console.error('Error fetching single price:', error);
      }
    };

    void fetchPriceSingle();
  }, []);
  const budget = label?.budget ?? 0;

  const isDisabled =
    price?.price === null || budget < (price?.price ?? Infinity);

  return (
    <>
      <div className='bg-primary flex items-center justify-center pt-4 text-center md:w-full'>
        <div className='mr-3 flex md:absolute md:left-0'>
          <ArrowLeft />
        </div>
        <h1 className='text-secondary text-center text-lg font-bold sm:text-2xl md:text-xl'>
          {' RECORDING A NEW SINGLE'}
        </h1>
        <div className='h-6 w-6' />
      </div>
      <form onSubmit={handleSubmit}>
        <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6 sm:px-6 md:px-12'>
          {/* Header */}

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
                <MarketingCard
                  key={campaign.id}
                  marketing={campaign}
                  budget={budget}
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

          {messageError ? (
            <p className='mt-4 text-center text-sm text-red-500'>
              {messageError}
            </p>
          ) : (
            ''
          )}

          {/* Buttons */}
          <div className='mt-6 flex items-start justify-between gap-x-16'>
            <VerifyButton
              color='bg-secondary active:scale-95 transition-transform'
              image='/assets/not-check.png'
              onClick={async () => {
                await navigate(-1);
              }}
            >
              {'Cancel'}
            </VerifyButton>
            <div className='justify-center text-center'>
              <VerifyButton
                color={
                  isDisabled || isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 active:scale-95 transition-transform'
                }
                image='/assets/check.png'
                disabled={isDisabled || isSubmitting}
                type={'submit'}
              >
                {'Confirm'}
              </VerifyButton>
              {price ? `${price.price} $` : ''}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
