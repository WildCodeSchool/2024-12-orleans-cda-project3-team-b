import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddArtist from '@/components/add-artist';
// import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCardHire from '@/components/artist-card-hire';
import ChooseName from '@/components/choose-name';
import ChooseSingle from '@/components/choose.single';
// import MarketingCard from '@/components/marketing-card';
import SingleCard from '@/components/single-card';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { InfoLabel } from '../../../../backend/api/src/games/label-info';
import type { Price } from '../../../../backend/api/src/games/price';
// import type { Marketing } from '../../../../backend/api/src/marketing/marketing';
import type { Single } from '../../../../backend/api/src/singles/singles';

export default function CreateAlbum() {
  const [artistsHired, setArtistsHired] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  // const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
  //   null,
  // );
  const [chosenSingles, setChosenSingles] = useState<Single[]>([]);
  const navigate = useNavigate();
  const [selectedSinglesId, setSelectedSinglesId] = useState<number[]>([]);
  // const [marketing, setMarketing] = useState<Marketing[]>([]);
  // const [submitted, setSubmitted] = useState(false);
  const [singleName, setSingleName] = useState('');
  const [messageError, setMessageError] = useState('');
  const [price, setPrice] = useState<Price | undefined>(undefined);
  const [infoLabel, setInfoLabel] = useState<InfoLabel | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setMessageError('');
    if (
      selectedArtistId === null ||
      !singleName.trim() ||
      selectedSinglesId.length < 3
    ) {
      setMessageError(
        'Please select an artist, enter a name for the album and choose minimun 3 singles.',
      );
      return;
    } else {
      try {
        await fetch('/api/albums/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            artistHiredId: selectedArtistId,
            singleName: singleName.trim(),
            singleId: selectedSinglesId,
            genreId: artistsHired.find((a) => a.id === selectedArtistId)
              ?.genre_id,
            price: price?.price,
          }),
        });
        void navigate('/album-congrats');
      } catch (error) {
        console.error('Submission failed:', error);
      }
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        if (selectedArtistId != null) {
          const resArtistsHired = await fetch('/api/artists-hired');
          if (!resArtistsHired.ok)
            throw new Error(`Artist error: ${resArtistsHired.status}`);
          const artistsData: ArtistHired[] = await resArtistsHired.json();
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

  // useEffect(() => {
  //   const fetchMarketing = async () => {
  //     try {
  //       if (selectedMarketingId != null) {
  //         const resMarketing = await fetch('/api/marketing');
  //         if (!resMarketing.ok)
  //           throw new Error(`Marketing error: ${resMarketing.status}`);
  //         const marketingData: Marketing[] = await resMarketing.json();
  //         const selectedMarketing = marketingData.find(
  //           (m) => m.id === selectedMarketingId,
  //         );
  //         setMarketing(selectedMarketing ? [selectedMarketing] : []);
  //       } else {
  //         setMarketing([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching marketing:', error);
  //       setMarketing([]);
  //     }
  //   };

  //   void fetchMarketing();
  // }, [selectedMarketingId]);

  useEffect(() => {
    const fetchSingles = async () => {
      try {
        if (selectedSinglesId.length > 0) {
          const resSingles = await fetch('/api/singles');
          if (!resSingles.ok)
            throw new Error(`Singles error: ${resSingles.status}`);
          const singlesData: Single[] = await resSingles.json();
          const selected = singlesData.filter((s) =>
            selectedSinglesId.includes(s.id),
          );
          setChosenSingles(selected.slice(0, 3));
        } else {
          setChosenSingles([]);
        }
      } catch (error) {
        console.error('Error fetching singles:', error);
        setChosenSingles([]);
      }
    };

    void fetchSingles();
  }, [selectedSinglesId]);

  useEffect(() => {
    const fetchPriceSingle = async () => {
      try {
        const res = await fetch('/api/games/price-albums');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Price = await res.json();

        setPrice(data);
      } catch (error) {
        console.error('Error fetching single price:', error);
      }
    };
    const fetchInfoLabel = async () => {
      try {
        const res = await fetch('/api/games/label');
        const data: InfoLabel = await res.json();
        setInfoLabel(data);
      } catch (error) {
        console.error('Error fetching budget:', error);
      }
    };
    void fetchInfoLabel();

    void fetchPriceSingle();
  }, []);
  const budget = infoLabel?.budget ?? 0;

  const isDisabled =
    price?.price === null || budget < (price?.price ?? Infinity);

  return (
    <form
      onSubmit={(event) => {
        void handleSubmit(event);
      }}
    >
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
        <div className='mb-4 flex w-full items-center justify-between'>
          <div>
            <ArrowLeft />
          </div>
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {'RECORDING A NEW ALBUM'}
          </h1>
          <div className='h-6 w-6' />
        </div>
        <img className='h-22 w-22' src='/assets/album.png' alt='' />
        <div className='mt-6'>
          {artistsHired.length > 0 ? (
            artistsHired.map((artist) => (
              <ArtistCardHire key={artist.artists_id} artist={artist} />
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
            name="Choose your album's name"
            placeholder="Album's name"
            value={singleName}
            onChange={handleChange}
          />
        </div>

        <div className='mt-6 flex w-full flex-col items-center gap-2'>
          {chosenSingles.length > 0 ? (
            chosenSingles.map((single) => (
              <SingleCard
                key={single.id}
                id={single.id}
                name={single.name}
                score={single.score}
                onToggleSelect={(id) => {
                  setSelectedSinglesId((prevIds) =>
                    prevIds.filter((prevId) => prevId !== id),
                  );
                }}
              />
            ))
          ) : (
            <p className='text-secondary text-s mt-4 text-center'>
              {'No single selected'}
            </p>
          )}
          <ChooseSingle
            onSingleSelected={(id) => {
              setSelectedSinglesId((prev) =>
                prev.includes(id) ? prev : [...prev, id].slice(0, 3),
              );
            }}
            artistId={selectedArtistId}
          />
        </div>
        {/* <div className='mt-6'>
          {marketing.length > 0 ? (
            marketing.map((campaign) => (
              <MarketingCard key={campaign.id} marketing={campaign} />
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
        </div> */}
        {messageError ? (
          <p className='mt-4 text-center text-sm text-red-500'>
            {messageError}
          </p>
        ) : (
          ''
        )}

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
                isDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-orange-500 active:scale-95 transition-transform'
              }
              type={'submit'}
              image='/assets/check.png'
              disabled={isDisabled}
            >
              {'Confirm'}
            </VerifyButton>
            {price ? `${price.price} $` : ''}
          </div>
        </div>
      </div>
    </form>
  );
}
