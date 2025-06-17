import type { Album } from '../../../../backend/api/src/albums/albums';
import type { Single } from '../../../../backend/api/src/singles/singles';

type CongratulationsProps = {
  readonly items: Single | Album;
  readonly text: string;
};

export default function Congratulations({ text, items }: CongratulationsProps) {
  return (
    <div className='mt-5 flex flex-col items-center'>
      <h1 className='text-secondary text-2xl font-bold'>
        {'CONGRATULATIONS!!! 🎊'}
      </h1>

      <h2 className='text-secondary mt-2 text-xl'>
        {`${items.artist_alias ?? `${items.artist_firstname} ${items.artist_lastname}`} just made a new ${text}!`}
      </h2>

      <div className='mt-10 flex flex-col items-center'>
        <h3 className='text-secondary text-2xl'>{items.name}</h3>
        <p className='text-secondary text-sm font-light'>
          {'by '}
          {items.artist_alias ??
            `${items.artist_firstname} ${items.artist_lastname}`}
        </p>
        <img
          className='mt-4 h-22 w-22'
          src='/assets/music-note.png'
          alt='single cover'
        />
      </div>
      <div className='text-secondary mt-6 items-center font-bold'>
        <div className='flex'>
          <h2>{`Score : ${items.score}`}</h2>
        </div>
        <div className='flex'>
          <h2 className='text-secondary mr-2 font-bold'>
            {'You just earned:'}
          </h2>
          <h3 className='text-secondary flex font-bold'>
            {items.money_earned}
            <img
              className='mt-1.5 h-3.5 w-4'
              src='/assets/dollar-icon.png'
              alt='dollar icon'
            />
          </h3>
        </div>
      </div>
    </div>
  );
}
