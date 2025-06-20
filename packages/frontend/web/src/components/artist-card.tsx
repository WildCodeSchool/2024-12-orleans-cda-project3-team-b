import { Link } from 'react-router-dom';

import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { Artist } from '../../../../backend/api/src/artists/artists';

type ArtistCardProps = {
  readonly artist: Artist | ArtistHired;
  readonly onHire?: (artistId: number) => void;
  readonly budget?: number;
  readonly isLink?: boolean;
  readonly isOnFire?: boolean;
  readonly to?: string;
};
export default function ArtistCard({
  artist,
  onHire,
  budget,
  isLink,
  to,
  isOnFire,
}: ArtistCardProps) {
  const isDisabled = (budget ?? 0) < artist.price;

  return (
    <div
      key={artist.id}
      className='bg-secondary flex h-14 w-70 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)] md:h-20 md:w-110'
    >
      {(isLink ?? false) && to ? (
        <Link to={to}>
          <img
            className='h-10 w-10 rounded-4xl'
            src={`/assets/${artist.image}`}
            alt=''
          />
        </Link>
      ) : (
        <img
          className='h-10 w-10 rounded-4xl md:h-16 md:w-16'
          src={`/assets/${artist.image}`}
          alt=''
        />
      )}
      <div className='flex flex-col items-center'>
        <h2 className='ml-2 text-sm md:text-xl'>
          {artist.firstname} {artist.lastname} {artist.alias}
        </h2>
        <h3 className='text-sm md:text-xl'>{artist.genre}</h3>
      </div>
      <div className='flex items-center'>
        <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
        <img
          className='mt-0.5 h-5 w-5'
          src='/assets/star-sign.png'
          alt='star icon'
        />
      </div>
      {(isOnFire ?? false) ? (
        <div className='flex flex-col items-center'>
          <button
            type='button'
            onClick={() => onHire?.(artist.id ?? 0)}
            disabled={isDisabled}
            className={`flex h-8 w-18 items-center justify-center rounded-sm pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)] ${
              isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
            }`}
          >
            {'Hire'}
            <img
              className='h-7 w-7'
              src='/assets/sign.png'
              alt='contract logo'
            />
          </button>
          <div className='flex items-center'>
            <h2 className='flex items-center font-bold'>{artist.price}</h2>
            <img
              className='mt-0.5 h-3.5 w-3.5'
              src='/assets/dollar-icon.png'
              alt='dollar icon'
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
