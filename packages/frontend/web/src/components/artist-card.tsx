import type { Artist } from '../pages/hire-artist';

type ArtistCardProps = {
  readonly artist: Artist;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div
      key={artist.artist_id}
      className='bg-secondary flex h-12 w-45 items-center justify-between gap-2 rounded-sm p-2 text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)] sm:h-12 sm:w-60 sm:flex-row sm:gap-0 md:w-60'
    >
      <img
        className='h-8 w-8 rounded-4xl sm:h-10 md:h-10 md:w-10'
        src={`/assets/${artist.image}`}
        alt=''
      />
      <div className='flex flex-col items-center text-center text-xs md:text-sm'>
        <h2>
          {artist.firstname} {artist.lastname} {artist.alias}
        </h2>
        <h3>{artist.genre_name}</h3>
      </div>
      <div className='flex items-center text-xs md:text-sm'>
        <h2 className='font-bold'>{artist.notoriety}</h2>
        <img className='h-4 w-4' src='/assets/star-sign.png' alt='' />
      </div>
    </div>
  );
}
