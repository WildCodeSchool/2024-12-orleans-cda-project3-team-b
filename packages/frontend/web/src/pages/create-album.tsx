import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import ChooseSingle from '@/components/choose.single';
import MarketingCard from '@/components/marketing-card';
import type { Marketing } from '@/components/marketing-card';
import type { Singles } from '@/components/modal-singles';
import SingleCard from '@/components/single-card';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from './main-menu';

export default function CreateAlbum() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const [chosenSingles, setChosenSingles] = useState<Singles[]>([]);
  const navigate = useNavigate();
  const [selectedSinglesId, setSelectedSinglesId] = useState<number[]>([]);
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [singleName, setSingleName] = useState('');
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async () => {
    setHasTriedSubmit(true);
    if (
      !selectedArtistId ||
      !singleName.trim() ||
      selectedSinglesId.length !== 0
    )
      try {
        const res = await fetch('/api/albums/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            artistId: selectedArtistId,
            singleName: singleName.trim(),
            singleId: selectedSinglesId,
            artists,
          }),
        });

        setSubmitted(true);
      } catch (error) {
        console.error('Submission failed:', error);
      }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        if (selectedArtistId != null) {
          const resArtists = await fetch('/api/artists-hired');
          if (!resArtists.ok)
            throw new Error(`Artist error: ${resArtists.status}`);
          const artistsData: ArtistHired[] = await resArtists.json();
          const selectedArtist = artistsData.find(
            (a) => a.id === selectedArtistId,
          );
          setArtists(selectedArtist ? [selectedArtist] : []);
        } else {
          setArtists([]);
        }
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
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
            throw new Error(`Marketing error: ${resMarketing.status}`);
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
    const fetchSingles = async () => {
      try {
        if (selectedSinglesId.length > 0) {
          const resSingles = await fetch('/api/singles');
          if (!resSingles.ok)
            throw new Error(`Singles error: ${resSingles.status}`);
          const singlesData: Singles[] = await resSingles.json();
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

  return (
    <form action='' method='post'>
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
            name="Choose your album's name"
            placeholder="Album's name"
            value={singleName}
            onChange={handleChange}
          />
        </div>

        <div className='mt-12 flex w-full flex-col items-center gap-2'>
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
        <div className='mt-6'>
          {marketing.length > 0 ? (
            marketing.map((m) => <MarketingCard key={m.id} marketing={m} />)
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
        <div className='mt-6'>
          {hasTriedSubmit &&
          (!selectedArtistId ||
            !singleName.trim() ||
            selectedSinglesId.length === 0) ? (
            <p className='text-center text-sm text-red-500'>
              {
                'Please select an artist, enter a name for the album and choose at least 1 single.'
              }
            </p>
          ) : null}
        </div>

        <div className='mt-12 flex items-center justify-between gap-x-16'>
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
