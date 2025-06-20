/**
 * This file was generated by kysely-codegen.
 * Please do not edit it manually.
 */

import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Albums {
  artists_hired_id: number;
  exp_value: number;
  genres_id: number;
  id: Generated<number>;
  money_earned: number;
  name: string;
  notoriety_gain: Generated<number>;
  sales: number;
  score: number;
}

export interface AlbumsMarketing {
  albums_id: number;
  id: Generated<number>;
  marketing_id: number;
}

export interface Artists {
  alias: string | null;
  exp_value: number;
  firstname: string | null;
  genres_id: number;
  id: Generated<number>;
  image: string;
  lastname: string | null;
  milestones_id: number;
  notoriety: number;
  price: number;
}

export interface ArtistsHired {
  artists_id: number;
  grade: number | null;
  id: Generated<number>;
  milestones_id: number | null;
  notoriety: number;
  skills_id: number | null;
}

export interface ArtistsHiredSkills {
  artists_hired_id: number;
  grade: number | null;
  id: Generated<number>;
  skills_id: number;
}

export interface ArtistsSkills {
  artists_id: number;
  grade: number | null;
  id: Generated<number>;
  skills_id: number;
}

export interface CrewMembers {
  bonus: number;
  exp_value: number;
  id: Generated<number>;
  image: string;
  job: string;
  price: number;
}

export interface CrewMembersHired {
  artists_id: number;
  crew_members_id: number;
  id: Generated<number>;
}

export interface Genres {
  id: Generated<number>;
  name: string;
}

export interface LabelArtists {
  artists_hired_id: number;
  id: Generated<number>;
  label_id: number;
}

export interface Labels {
  budget: number;
  id: Generated<number>;
  levels_id: Generated<number | null>;
  logos_id: number;
  name: string;
  notoriety: number;
  score_xp: number;
  users_id: number;
}

export interface Levels {
  id: Generated<number>;
  value: number;
}

export interface Logos {
  id: Generated<number>;
  logo_img: string;
}

export interface Marketing {
  bonus: number;
  exp_value: number;
  id: Generated<number>;
  image: string;
  name: string;
  price: number;
}

export interface Milestones {
  id: Generated<number>;
  name: string;
  value: number;
}

export interface Price {
  id: Generated<number>;
  name: string;
  price: number | null;
}

export interface Singles {
  artists_hired_id: number;
  exp_value: number;
  genres_id: number;
  id: Generated<number>;
  listeners: number;
  money_earned: number;
  name: string;
  score: number;
}

export interface SinglesAlbums {
  albums_id: number;
  id: Generated<number>;
  singles_id: number;
}

export interface SinglesMarketing {
  id: Generated<number>;
  marketing_id: number;
  singles_id: number;
}

export interface Skills {
  exp_value: number;
  id: Generated<number>;
  name: string;
}

export interface Staff {
  bonus: number;
  exp_value: number;
  id: Generated<number>;
  image: string;
  job: string;
  price: number;
}

export interface StaffLabel {
  id: Generated<number>;
  labels_id: number | null;
  staff_id: number;
}

export interface Users {
  creation_date: Generated<Date>;
  email: string;
  id: Generated<number>;
  is_first_time: Generated<number>;
  password: string;
}

export interface DB {
  albums: Albums;
  albums_marketing: AlbumsMarketing;
  artists: Artists;
  artists_hired: ArtistsHired;
  artists_hired_skills: ArtistsHiredSkills;
  artists_skills: ArtistsSkills;
  crew_members: CrewMembers;
  crew_members_hired: CrewMembersHired;
  genres: Genres;
  label_artists: LabelArtists;
  labels: Labels;
  levels: Levels;
  logos: Logos;
  marketing: Marketing;
  milestones: Milestones;
  price: Price;
  singles: Singles;
  singles_albums: SinglesAlbums;
  singles_marketing: SinglesMarketing;
  skills: Skills;
  staff: Staff;
  staff_label: StaffLabel;
  users: Users;
}
