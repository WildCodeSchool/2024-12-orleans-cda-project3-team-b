import { useEffect, useState } from 'react';

import ArtistCard from '@/components/artist-card';
import type { ArtistHired } from '@/pages/main-menu';

const publicKey = import.meta.env.VITE_API_URL;

export type ModalMyArtistsProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectArtist: (artistId: number) => void;
};

export default function ModalMyArtists({
  isOpen,
  onClose,
  onSelectArtist,
}: ModalMyArtistsProps) {
  const [artists, setArtists] = useState<ArtistHired[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchArtists = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${publicKey}/artists-hired`);
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.error('Error loading artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
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
      <div className='relative z-10 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='w-full text-center text-xl font-bold'>
            {'My Artists'}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='absolute top-4 right-4 text-lg text-gray-500'
          >
            {'✕'}
          </button>
        </div>

        {loading ? (
          <p className='text-center text-gray-500'>{'Loading...'}</p>
        ) : (
          <div className='grid grid-cols-2 gap-4'>
            {artists.map((artist) => (
              <div
                key={artist.artists_id}
                onClick={() => {
                  onSelectArtist(artist.artists_id);
                  onClose();
                }}
                className='cursor-pointer transition-transform hover:scale-105'
              >
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
