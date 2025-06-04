import { jsonArrayFrom } from 'kysely/helpers/mysql';

import { db } from '@app/backend-shared';

type ArtistData = {
  id: number;
  firstname: string;
  lastname: string;
  alias?: string;
  name: string; // genre name
  image: string;
  milestones?: string;
  notoriety: number;
  price: number;
  skills: [
    {
      name: string;
      grade: number;
      skills_id: number;
      artistsHiredSkillsId: number;
    },
  ];
};

export function GetArtistData({
  userId,
  id,
  hired = false,
}: {
  userId?: number;
  id: number;
  hired?: boolean;
}): Promise<ArtistData[]> {
  if (hired) {
    if (userId == null) {
      throw new Error('userId is null');
    }

    return db
      .selectFrom('users')
      .where('users.id', '=', userId)
      .leftJoin('labels', 'labels.users_id', 'users.id')
      .leftJoin('label_artists', 'label_artists.label_id', 'labels.id')
      .leftJoin(
        'artists_hired',
        'artists_hired.id',
        'label_artists.artists_hired_id',
      )
      .leftJoin('artists', 'artists.id', 'artists_hired.artists_id')
      .leftJoin('genres', 'genres.id', 'artists.genres_id')
      .leftJoin('milestones', 'milestones.id', 'artists.milestones_id')
      .select((eb) => [
        'artists.id',
        'artists.firstname',
        'artists.lastname',
        'artists.alias',
        'genres.name',
        'artists.image',
        'milestones.name as milestones',
        'artists.notoriety',
        'artists.price',
        jsonArrayFrom(
          eb
            .selectFrom('artists_hired_skills')
            .leftJoin('skills', 'skills.id', 'artists_hired_skills.skills_id')
            .select([
              'skills.name',
              'artists_hired_skills.grade',
              'artists_hired_skills.skills_id',
              'artists_hired_skills.id as artistsHiredSkillsId',
            ])
            .whereRef(
              'artists_hired_skills.artists_hired_id',
              '=',
              'artists_hired.id',
            ),
        ).as('skills'),
      ])
      .where('artists_hired.id', '=', id)
      .execute() as Promise<ArtistData[]>;
  } else {
    return db
      .selectFrom('artists')
      .leftJoin('genres', 'genres.id', 'artists.genres_id')
      .leftJoin('milestones', 'milestones.id', 'artists.milestones_id')
      .select((eb) => [
        'artists.id',
        'artists.firstname',
        'artists.lastname',
        'artists.alias',
        'genres.name',
        'artists.image',
        'milestones.name as milestones',
        'artists.notoriety',
        'artists.price',
        jsonArrayFrom(
          eb
            .selectFrom('artists_skills')
            .leftJoin('skills', 'skills.id', 'artists_skills.skills_id')
            .select([
              'skills.name',
              'artists_skills.grade',
              'artists_skills.skills_id',
              'artists_skills.skills_id as artistsHiredSkillsId', // fallback
            ])
            .whereRef('artists_skills.artists_id', '=', 'artists.id'),
        ).as('skills'),
      ])
      .where('artists.id', '=', id)
      .execute() as Promise<ArtistData[]>;
  }
}
