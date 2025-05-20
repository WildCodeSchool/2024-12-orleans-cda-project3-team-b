import { useState } from 'react';

import AddButton from './add-button';
import ModalMarketing from './modal-marketing';

type Props = {
  readonly onMarketingSelected: (id: number) => void;
};

export default function AddMarketing({ onMarketingSelected }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <AddButton>{'+'}</AddButton>
      </button>

      <h2 className='text-secondary pt-1 text-xl'>{'Marketing Campaign'}</h2>

      <ModalMarketing
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSelectMarketing={(id) => {
          onMarketingSelected(id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
