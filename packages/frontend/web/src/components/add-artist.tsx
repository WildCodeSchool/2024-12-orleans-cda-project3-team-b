import { useState } from 'react';

import AddButton from './add-button';
import ModalMyArtists from './modal-my-artists';

type Props = {
  readonly onArtistSelected: (id: number | null) => void;
};

export default function AddArtist({ onArtistSelected }: Props) {
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

      <h2 className='text-secondary pt-1 text-xl'>{'Choose an artist'}</h2>

      <ModalMyArtists
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onSelectArtist={(id) => {
          onArtistSelected(id);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
