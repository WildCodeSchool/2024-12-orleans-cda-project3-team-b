import { Link } from 'react-router-dom';

import AddButton from './add-button';

export default function AddArtist() {
  return (
    <div className='mt-8 flex flex-col items-center justify-center'>
      <Link to='/my-artists'>
        <AddButton>{'+'}</AddButton>
      </Link>

      <h2 className='text-secondary pt-1 text-xl'>{'Choose an artist'}</h2>
    </div>
  );
}
