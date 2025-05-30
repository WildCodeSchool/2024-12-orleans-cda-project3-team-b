import { Link } from 'react-router-dom';

import type { ArtistHired } from '@/pages/main-menu';

type ArtistCardHireProps = {
  readonly artist: ArtistHired;
  readonly budget: number;
};

export default function ArtistCardHire({
  artist,
  budget,
}: ArtistCardHireProps) {
  const isDisabled = budget < artist.price;

  return (
    <div
      key={artist.artist_hired_id}
      className='bg-secondary flex h-12 w-60 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
    >
      <Link to={`/artists-hired/${artist.artist_hired_id}`}>
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
        <h3>{artist.genre_name}</h3>
      </div>
      <div className='flex items-center text-sm'>
        <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
        <img
          className='mt-0.5 h-5 w-5'
          src='/assets/star-sign.png'
          alt='star icon'
        />
      </div>
      <div className='flex flex-col items-center'>
        {/* <button
          type='button'
          onClick={() => {
            onHire(artist.artist_id);
          }}
          disabled={isDisabled}
          className={`flex h-8 w-18 items-center justify-center rounded-sm pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)] ${
            isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
          }`}
        >
          {'Hire'}
          <img className='h-7 w-7' src='/assets/sign.png' alt='contract logo' />
        </button> */}
        {/* <div className='flex items-center'>
          <h2 className='flex items-center font-bold'>{artist.price}</h2>
          <img
            className='mt-0.5 h-3.5 w-3.5'
            src='/assets/dollar-icon.png'
            alt='dollar icon'
          />
        </div> */}
        {isDisabled ? (
          <p className='mt-1 text-xs text-red-200'>{'Not enough budget'}</p>
        ) : null}
      </div>
    </div>
  );
}
