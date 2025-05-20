import { useEffect, useState } from 'react';

import MarketingCard from './marketing-card';

export type Marketing = {
  id: number;
  name: number;
  bonus: string;
  price: string;
  image: string;
};

export type ModalMarketingProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onSelectMarketing: (marketingId: number) => void;
};

export default function ModalMarketing({
  isOpen,
  onClose,
  onSelectMarketing,
}: ModalMarketingProps) {
  const [marketing, setMarketing] = useState<Marketing[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchMarketing = async () => {
      try {
        const res = await fetch(`/api/marketing`);
        const data = await res.json();
        setMarketing(data);
      } catch (error) {
        console.error('Error loading artists:', error);
        setMarketing([]);
      }
    };

    void fetchMarketing();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80'>
      {/* Click outside */}
      <div className='absolute inset-0' onClick={onClose} />

      {/* Modal Content */}
      <div className='bg-primary relative z-10 w-full max-w-3xl rounded-2xl p-6 shadow-xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-secondary w-full text-center text-xl font-bold'>
            {'Marketing'}
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
          {marketing.map((marketing) => (
            <div
              key={marketing.id}
              onClick={() => {
                onSelectMarketing(marketing.id);
                onClose();
              }}
              className='cursor-pointer transition-transform hover:scale-105'
            >
              <MarketingCard
                id={marketing.id}
                name={marketing.name}
                bonus={marketing.bonus}
                price={marketing.price}
                image={marketing.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
