import { useEffect, useState } from 'react';

import AddArtist from '@/components/add-artist';
import AddMarketing from '@/components/add-marketing';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import ChooseSingle from '@/components/choose.single';
import MarketingCard from '@/components/marketing-card';
import type { Marketing } from '@/components/modal-marketing';
import type { Singles } from '@/components/modal-singles';
import SingleCard from '@/components/single-card';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from './main-menu';

export default function CreateAlbumMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [selectedMarketingId, setSelectedMarketingId] = useState<number | null>(
    null,
  );
  const [chosenSingles, setChosenSingles] = useState<Singles[]>([]);

  const [selectedSinglesId, setSelectedSinglesId] = useState<number[]>([]);
  const [marketing, setMarketing] = useState<Marketing[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [singleName, setSingleName] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleName(event.target.value);
  };

  const handleSubmit = async () => {
    if (
      !selectedArtistId ||
      !singleName.trim() ||
      selectedSinglesId.length === 0
    ) {
      alert('Please select an artist, a name, and at least one single.');
      return;
    }

    try {
      // 1. Créer l'album
      const res = await fetch('/api/albums/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artistId: selectedArtistId,
          singleName: singleName.trim(),
        }),
      });

      if (!res.ok) {
        alert('An error occurred while creating the album.');
        return;
      }

      const { albumId } = await res.json();

      if (!albumId) {
        alert('Album created but no album ID returned.');
        return;
      }

      // 3. Envoyer les singles dans singles_albums
      const resLink = await fetch('/api/singles-albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          singlesId: selectedSinglesId,
          albumId: albumId,
        }),
      });

      if (!resLink.ok) {
        alert('Album created, but failed to link singles.');
        return;
      }

      setSubmitted(true);
      console.log('Album and singles linked:', {
        albumId,
        selectedSinglesId,
      });
    } catch (error) {
      console.error('Submission failed:', error);
      alert('Failed to submit. Please try again.');
    }
  };

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
            (artist) => artist.id === selectedArtistId,
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

  useEffect(() => {
    const fetchSingles = async () => {
      try {
        const apiUrl = `/api/singles`;
        const response = await fetch(apiUrl);
        console.log('IDs sélectionnés :', selectedSinglesId);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data: Singles[] = await response.json();

        const selected = data.filter((single) =>
          selectedSinglesId.includes(single.id),
        );

        setChosenSingles(selected.slice(0, 3));
      } catch (error) {
        console.error('Error fetching singles:', error);
        setChosenSingles([]);
      }
    };

    if (selectedSinglesId.length > 0) {
      void fetchSingles();
    } else {
      setChosenSingles([]);
    }
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
