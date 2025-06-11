import type { ArtistHired } from '../../../../backend/api/src/artists-hired/artists-hired';
import type { Artist } from '../../../../backend/api/src/artists/artists';
import AddButton from './add-button';

type ArtistProfileCardProps = {
  readonly artist: Artist | ArtistHired;
  readonly fetchArtistsHired?: (() => Promise<void>) | undefined;
  readonly isAddButton?: boolean;
};

export default function ArtistProfileCard({
  artist,
  isAddButton,
  fetchArtistsHired,
}: ArtistProfileCardProps) {
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
    if (fetchArtistsHired) {
      await fetchArtistsHired();
    }
  }

  return (
    <div
      className='bg-secondary h-80 w-120 rounded-xl border shadow-[3px_5px_6px_rgba(0,0,0,0.30)]'
      key={artist.id}
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
            {artist.genre}
          </h3>
          <div className='ml-4 flex items-center text-sm'>
            <h2 className='text-primary flex text-xl'>{artist.notoriety}</h2>
            <img className='mt-1 h-7 w-7' src='/assets/star-sign.png' alt='' />
            <h2 className='text-primary ml-2 text-xl'>
              {artist.milestones_name}
            </h2>
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center'>
        <ul className='text-primary flex flex-col'>
          {artist.skills.map((competence) => (
            <div
              key={competence.skillsId}
              className='item-center flex flex-row'
            >
              <li className='flex items-center gap-4'>
                {competence.name}
                {' :'}
                {competence.grade}
                {' /25'}
                {(isAddButton ?? false) ? (
                  <AddButton
                    key={competence.artistsHiredSkillsId}
                    onClick={() =>
                      addPoint(
                        competence.artistsHiredSkillsId ?? 0,
                        competence.skillsId ?? 0,
                      )
                    }
                    disabled={(competence.grade ?? 0) >= 25}
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
