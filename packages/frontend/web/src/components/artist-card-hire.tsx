import { Link } from 'react-router-dom';

import type { Artist } from '../pages/hire-artist';

type ArtistCardProps = {
  readonly artist: Artist;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link to={`/artists-hired/${artist.artists_id}`}>
      <div
        key={artist.artists_id}
        className='bg-secondary flex h-12 w-60 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
      >
        <img
          className='h-10 w-10 rounded-4xl'
          src={`/assets/${artist.image}`}
          alt=''
        />
        <div className='flex flex-col items-center text-sm'>
          <h2 className='ml-2'>
            {artist.firstname} {artist.lastname} {artist.alias}
          </h2>
          <h3>{artist.genre_name}</h3>
        </div>
        <div className='flex items-center text-sm'>
          <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
          <img className='mt-0.5 h-4 w-4' src='/assets/star-sign.png' alt='' />
        </div>
      </div>
    </Link>
  );
}
