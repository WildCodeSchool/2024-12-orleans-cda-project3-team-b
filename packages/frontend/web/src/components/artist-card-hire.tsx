import { Link } from 'react-router-dom';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';

// import type { Artist } from '../../../../backend/api/src/artists/artists';

type ArtistCardHireProps = {
  readonly artist: ArtistHired;
  readonly budget: number;
};
export default function ArtistCardHire({ artist }: ArtistCardHireProps) {
  return (
    <div
      key={artist.id}
      className='bg-secondary flex h-12 w-60 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
    >
      <Link to={`/artists-hired/${artist.id}`}>
        <img
          className='h-10 w-10 rounded-4xl'
          src={`/assets/${artist.image}`}
          alt=''
        />
      </Link>
      <div className='flex flex-col items-center text-sm'>
        <h2 className='ml-2'>
          {artist.firstname} {artist.lastname} {artist.alias}
        </h2>
        <h3 className='text-sm md:text-lg'>{artist.genre}</h3>
      </div>
      <div className='flex items-center text-sm'>
        <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
        <img
          className='mt-0.5 h-5 w-5'
          src='/assets/star-sign.png'
          alt='star icon'
        />
      </div>
    </div>
  );
}
