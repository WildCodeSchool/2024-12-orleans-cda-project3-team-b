import { useEffect, useState } from 'react';

export type Singles = {
  readonly id: number;
  readonly name: string;
  readonly score: number;
  readonly artists_hired_id: number;
};

export type ModalSinglesProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectSingle: (SingleId: number) => void;
  readonly artistId: number | null;
};

export function ModalSingles({
  isOpen,
  onClose,
  artistId,
  onSelectSingle,
}: ModalSinglesProps) {
  const [singles, setSingles] = useState<Singles[]>([]);

  useEffect(() => {
    const fetchSingles = async () => {
      try {
        const res = await fetch(`/api/singles`);
        const data: Singles[] = await res.json();

        if (artistId != null) {
          const filtered = data.filter(
            (single) => single.artists_hired_id === artistId,
          );
          setSingles(filtered);
        } else {
          setSingles([]);
        }
      } catch (error) {
        console.error('Error loading singles:', error);
        setSingles([]);
      }
    };

    void fetchSingles();
  }, [isOpen, artistId]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
      {/* Click outside */}
      <div className='absolute inset-0' onClick={onClose} />

      {/* Modal Content */}
      <div className='bg-primary relative z-10 w-full max-w-3xl rounded-2xl p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-secondary w-full text-center text-xl font-bold'>
            {'My Singles'}
          </h2>
          <button
            type='button'
            onClick={onClose}
            className='text-secondary absolute top-4 right-4 text-lg'
          >
            {'✕'}
          </button>
        </div>

        <div className='grid grid-cols-2 gap-4'>
          {singles.map((single) => (
            <div
              key={single.id}
              onClick={() => {
                onSelectSingle(single.id);
                onClose();
              }}
              className='cursor-pointer transition-transform hover:scale-105'
            >
              <h1 className='bg-secondary text-white'> {single.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
