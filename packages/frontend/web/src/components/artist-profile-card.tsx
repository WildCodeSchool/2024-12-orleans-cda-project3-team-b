import AddButton from './add-button';

type Artist = {
  readonly firstname: string;
  readonly lastname: string;
  readonly alias: string;
  readonly image: string;
  readonly notoriety: number;
  readonly genre_name: string;
  readonly milestone_name: string;
  readonly skills: [
    {
      skills_id: number;
      name: string;
      grade: number;
      artistsHiredSkillsId: number;
    },
  ];
  readonly isAddButton?: boolean;
  readonly key: number;
  readonly artistsHiredId: number;
  readonly fetchArtistsHired?: (() => Promise<void>) | undefined;
};

type ArtistProfileCardProps = {
  readonly artist: Artist;
  readonly fetchArtistsHired?: (() => Promise<void>) | undefined;
  readonly isAddButton?: boolean;
};

export default function ArtistProfileCard({ artist }: ArtistProfileCardProps) {
  async function addPoint(artistsHiredSkillsId: number, skills_id: number) {
    try {
      const response = await fetch(`/api/games/point`, {
        method: 'POST',
        body: JSON.stringify({ artistsHiredSkillsId, skills_id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      await response.json();
    } catch (error) {
      console.error('Failed to fetch points:', error);
    }
    if (artist.fetchArtistsHired) {
      await artist.fetchArtistsHired();
    }
  }

  return (
    <div
      className='bg-secondary h-80 w-120 rounded-xl border shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
      key={artist.key}
    >
      <div className='mt-5 flex justify-center'>
        <img
          className='h-30 w-30 rounded-full'
          src={`/assets/${artist.image}`}
          alt=''
        />

        <div className='flex flex-col items-center justify-center'>
          <h2 className='text-primary ml-2 text-2xl font-bold'>
            {artist.firstname} {artist.lastname} {artist.alias}
          </h2>
          <h3 className='text-primary text-xl font-extralight'>
            {artist.genre_name}
          </h3>
          <div className='ml-4 flex items-center text-sm'>
            <h2 className='text-primary flex text-xl'>{artist.notoriety}</h2>
            <img className='mt-1 h-7 w-7' src='/assets/star-sign.png' alt='' />
            <h2 className='text-primary ml-2 text-xl'>
              {artist.milestone_name}
            </h2>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <ul className='text-primary flex flex-col'>
          {artist.skills.map((competence) => (
            <div
              key={competence.skills_id}
              className='item-center flex flex-row'
            >
              <li className='flex items-center gap-4'>
                {competence.name}
                {' :'}
                {competence.grade}
                {' /25'}
                {Boolean(AddButton) ? (
                  <AddButton
                    key={competence.artistsHiredSkillsId}
                    onClick={() =>
                      addPoint(
                        competence.artistsHiredSkillsId,
                        competence.skills_id,
                      )
                    }
                    disabled={competence.grade >= 25}
                  >
                    {'+'}
                  </AddButton>
                ) : (
                  ''
                )}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
