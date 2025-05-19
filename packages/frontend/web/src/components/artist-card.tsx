import type { ArtistHired } from '../pages/main-menu';

export type ArtistCardProps = {
  readonly artist: ArtistHired;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <div
      key={artist.artists_id}
      className='bg-secondary flex h-14 w-76 items-center justify-evenly rounded-sm text-white shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
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
        <h3 className='font-extralight'>{artist.genre_name}</h3>
      </div>
      <div className='flex items-center'>
        <div className='flex items-center text-sm'>
          <h2 className='flex items-center font-bold'>{artist.notoriety}</h2>
          <img
            className='mt-0.5 mr-2 h-4 w-4'
            src='/assets/star-sign.png'
            alt=''
          />
        </div>
        <p className='text-sm font-bold'>{artist.milestone_name}</p>
      </div>
    </div>
  );
}
