type ArtistHired = {
  readonly firstname: string;
  readonly lastname: string;
  readonly alias: string;
  readonly image: string;
  readonly notoriety: number;
  readonly genre_name: string;
  readonly milestone_name: string;
};

export default function ArtistProfileCard({
  firstname,
  lastname,
  alias,
  image,
  notoriety,
  genre_name,
  milestone_name,
}: ArtistHired) {
  return (
    <div className='bg-secondary h-80 w-120 rounded-xl border shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'>
      <div className='mt-5 flex justify-center'>
        <img
          className='h-30 w-30 rounded-full'
          src={`/assets/${image}`}
          alt=''
        />

        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-primary ml-2 text-2xl font-bold'>
            {firstname} {lastname} {alias}
          </h2>
          <h3 className='text-primary text-xl font-extralight'>{genre_name}</h3>
          <div className='ml-4 flex items-center text-sm'>
            <h2 className='text-primary flex text-xl'>{notoriety}</h2>
            <img className='mt-1 h-7 w-7' src='/assets/star-sign.png' alt='' />
            <h2 className='text-primary ml-2 text-xl'>{milestone_name}</h2>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <ul className='text-primary mt-4 ml-4 flex flex-col'>
          <li>{' skill 1'}</li>
          <li>{' skill 2'}</li>
          <li>{' skill 3'}</li>
          <li>{' skill 4'}</li>
        </ul>
      </div>
    </div>
  );
}
