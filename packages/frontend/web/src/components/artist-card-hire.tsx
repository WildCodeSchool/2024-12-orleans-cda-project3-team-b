import type { Artist } from '../pages/hire-artist';

type ArtistCardHireProps = {
  readonly artist: Artist;
  readonly onHire: (artistId: number) => void;
  readonly budget: number;
};

export default function ArtistCardHire({
  artist,
  onHire,
  budget,
}: ArtistCardHireProps) {
  const isDisabled = budget < artist.price;

  return (
    <div
      key={artist.artist_id}
      className='bg-secondary flex h-14 w-65 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)] md:h-20 md:w-90'
    >
      <img
        className='ml-2 h-10 w-10 rounded-4xl md:ml-0 md:h-16 md:w-16'
        src={`/assets/${artist.image}`}
        alt={`Portrait of ${artist.firstname} ${artist.lastname}`}
      />
      <div className='flex flex-col items-center'>
        <h2 className='ml-2 flex text-sm md:text-lg'>
          {artist.firstname} {artist.lastname} {artist.alias}
        </h2>
        <h3 className='text-sm md:text-lg'>{artist.genre_name}</h3>
      </div>
      <div className='flex items-center'>
        <h2 className='flex items-center text-sm font-bold md:text-lg'>
          {artist.notoriety}
        </h2>
        <img
          className='mt-0.5 h-5 w-5'
          src='/assets/star-sign.png'
          alt='star icon'
        />
      </div>
      <div className='flex flex-col items-center'>
        <button
          type='button'
          onClick={() => {
            onHire(artist.artist_id);
          }}
          disabled={isDisabled}
          className={`mr-2 flex h-6 w-13 items-center justify-center rounded-sm pl-2 text-xs font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)] hover:scale-95 md:mr-0 md:h-8 md:w-18 md:text-xl ${
            isDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-orange-500'
          }`}
        >
          {'Hire'}
          <img
            className='h-4 w-4 md:h-7 md:w-7'
            src='/assets/sign.png'
            alt='contract logo'
          />
        </button>
        <div className='flex items-center'>
          <h2 className='flex items-center text-xs font-bold md:text-lg'>
            {artist.price}
          </h2>
          <img
            className='h-2.5 w-2.5 md:mt-0.5 md:h-3.5 md:w-3.5'
            src='/assets/dollar-icon.png'
            alt='dollar icon'
          />
        </div>
      </div>
    </div>
  );
}
