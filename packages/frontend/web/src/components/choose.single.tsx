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
    <div className='flex flex-col items-center justify-center'>
      <div
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <AddSingle />
      </div>

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
