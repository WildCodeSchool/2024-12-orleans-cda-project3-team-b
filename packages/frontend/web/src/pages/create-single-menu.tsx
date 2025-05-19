import { useEffect, useState } from 'react';

import AddArtist from '@/components/add-artist';
import AddButton from '@/components/add-button';
import { ArrowLeft } from '@/components/arrow-left';
import ArtistCard from '@/components/artist-card';
import ChooseName from '@/components/choose-name';
import ModalMyArtists from '@/components/modal-my-artists';
import VerifyButton from '@/components/verify-button';

import type { ArtistHired } from './main-menu';

const publicKey = import.meta.env.VITE_API_URL;

export default function CreateSingleMenu() {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchArtistsHired = async () => {
      try {
        const apiUrl = `${publicKey}/artists-hired`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ArtistHired[] = await response.json();

        if (selectedArtistId) {
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

    if (selectedArtistId) {
      void fetchArtistsHired();
    }
  }, [selectedArtistId]);

  return (
    <form action='' method='post'>
      <div className='bg-primary flex min-h-screen flex-col items-center px-4 py-6'>
        {/* Header */}
        <div className='mb-4 flex w-full items-center justify-between'>
          <button type='button'>
            <ArrowLeft />
          </button>
          <h1 className='text-secondary text-center text-2xl font-bold'>
            {' RECORDING A NEW SINGLE'}
          </h1>
          <div className='h-6 w-6' />
        </div>

        {/* Image */}
        <img className='h-18 w-18' src='/assets/music-note.png' alt='note' />

        {/* Selected Artist */}
        <div className='mt-6'>
          {artists.length > 0 ? (
            artists.map((artist) => (
              <ArtistCard key={artist.artists_id} artist={artist} />
            ))
          ) : (
            <p className='text-secondary text-sm'>{'No artist selected.'}</p>
          )}
          <AddArtist
            onArtistSelected={(id) => {
              setSelectedArtistId(id);
            }}
          />
        </div>

        {/* Choose Name */}
        <div className='mt-6 flex flex-col items-center justify-center'>
          <ChooseName
            name="Choose your single's name"
            placeholder="Single's name"
          />
        </div>

        {/* Marketing Section */}
        <div className='mt-12 flex w-full flex-col items-center justify-between'>
          <AddButton>{'+'}</AddButton>
          <h2 className='text-secondary mt-1 text-center text-xl'>
            {'MARKETING CAMPAIGN'}
          </h2>
        </div>

        {/* Footer Buttons */}
        <div className='mt-12 flex items-center justify-between gap-x-16'>
          <VerifyButton color='bg-secondary' image='/assets/not-check.png'>
            {' Cancel'}
          </VerifyButton>
          <VerifyButton color='bg-orange-500' image='/assets/check.png'>
            {' Confirm'}
          </VerifyButton>
        </div>
      </div>

      <ModalMyArtists
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSelectArtist={(id) => {
          setSelectedArtistId(id);
          setModalOpen(false);
        }}
      />
    </form>
  );
}
