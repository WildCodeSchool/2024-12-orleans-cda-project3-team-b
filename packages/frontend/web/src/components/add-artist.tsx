import { useState } from 'react';

import AddButton from './add-button';
import ModalMyArtists from './modal-my-artists';

type Props = {
  readonly onArtistSelected: (id: number) => void;
};

export default function AddArtist({ onArtistSelected }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <button
        type='button'
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <AddButton>{'+'}</AddButton>
      </button>

      <h2 className='text-secondary pt-1 text-xl'>{'Choose an artist'}</h2>

      <ModalMyArtists
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        onSelectArtist={(id) => {
          onArtistSelected(id);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
