import type { Artist } from '@/pages/hire-artist';

type ArtistCardHireProps = {
  readonly artist: Artist;
  readonly onHire: (artistId: number) => void;
};

export default function ArtistCardHire({
  artist,
  onHire,
}: ArtistCardHireProps) {
  return (
    <div
      key={artist.artist_id}
      className='bg-secondary flex h-20 w-110 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
    >
      <img
        className='h-16 w-16 rounded-4xl'
        src={`/assets/${artist.image}`}
        alt={`Portrait of ${artist.firstname} ${artist.lastname}`}
      />
      <div className='flex flex-col items-center'>
        <h2 className='ml-2'>
          {artist.firstname} {artist.lastname} {artist.alias}
        </h2>
        <h3>{artist.genre_name}</h3>
      </div>
      <div className='flex items-center'>
        <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
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
          className='flex h-8 w-18 items-center justify-center rounded-sm bg-orange-500 pl-2 text-xl font-bold shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
        >
          {'Hire'}
          <img className='h-7 w-7' src='/assets/sign.png' alt='contract logo' />
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
    </div>
  );
}
