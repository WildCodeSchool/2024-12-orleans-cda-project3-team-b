import { useEffect, useState } from 'react';

import { useLabel } from '@/contexts/label-context';

import type { Price } from '../../../../backend/api/src/games/price';
import type { Marketing } from '../../../../backend/api/src/marketing/marketing';
import MarketingCard from './marketing-card';

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
  const { label } = useLabel();
  const [price, setPrice] = useState<Price>();

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

  if (!isOpen) return null;
  const budget = label?.budget ?? 0;

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
          {marketing.map((campaign) => (
            <MarketingCard
              marketing={campaign}
              budget={budget}
              price={price?.price ?? 0}
              key={campaign.id}
              onClick={() => {
                onSelectMarketing(campaign.id);
                onClose();
              }}
            />
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}
