import { useState } from 'react';

import AddSingle from './add-single';
import { ModalSingles } from './modal-singles';

type Props = {
  readonly onSingleSelected: (id: number) => void;
  readonly artistId: number | null;
};

export default function ChooseSingle({ onSingleSelected, artistId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <AddSingle />
      </button>

      <ModalSingles
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSelectSingle={(id) => {
          onSingleSelected(id);
          setIsModalOpen(false);
        }}
        artistId={artistId}
      />
    </div>
  );
}
