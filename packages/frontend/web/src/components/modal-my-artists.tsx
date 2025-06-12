import { useEffect, useState } from 'react';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import ArtistCardHire from './artist-card-hire';

export type ModalMyArtistsProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectArtist: (artistId: number | null) => void;
};

export default function ModalMyArtists({
  isOpen,
  onClose,
  onSelectArtist,
}: ModalMyArtistsProps) {
  const [artists, setArtists] = useState<ArtistHired[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchArtists = async () => {
      try {
        const res = await fetch(`/api/artists-hired`);
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error('Error loading artists:', error);
        setArtists([]);
      }
    };

    void fetchArtists();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
      {/* Click outside */}
      <div className='absolute inset-0' onClick={onClose} />

      {/* Modal Content */}
      <div className='bg-primary relative z-10 rounded-2xl p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-secondary w-full text-center text-xl font-bold'>
            {'My Artists'}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='text-secondary absolute top-4 right-4 text-lg'
          >
            {'✕'}
          </button>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => {
                onSelectArtist(artist.id);
                onClose();
              }}
              className='cursor-pointer transition-transform hover:scale-105'
            >
              <ArtistCardHire artist={artist} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
