import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`CREATE TABLE level (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value INT
  );`.execute(trx);

    await sql`CREATE TABLE logo (
      id INT AUTO_INCREMENT PRIMARY KEY,
      logo_img VARCHAR(255)
  );`.execute(trx);

    await sql`
    CREATE TABLE label (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        logo_id INT,
        budget FLOAT,
        notoriety FLOAT,
        level_id INT,
        score_xp INT,
        FOREIGN KEY (logo_id) REFERENCES logo(id),
        FOREIGN KEY (level_id) REFERENCES level(id)
    );`.execute(trx);

    await sql`
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_first_time BOOLEAN,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    label_id INT,
    FOREIGN KEY (label_id) REFERENCES label(id)
);`.execute(trx);

    await sql`CREATE TABLE milestones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    value INT
);`.execute(trx);
    await sql`CREATE TABLE skill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    score INT,
    exp_value INT
);`.execute(trx);

    await sql`CREATE TABLE genre (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255)
);`.execute(trx);
    await sql`CREATE TABLE artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    alias VARCHAR(255),
    notoriety FLOAT,
    genre_id INT,
    milestone_id INT,
    price INT,
    skill_id INT,
    exp_value INT,
    FOREIGN KEY (genre_id) REFERENCES genre(id),
    FOREIGN KEY (milestone_id) REFERENCES milestones(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);`.execute(trx);

    await sql`CREATE TABLE artist_hired (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artists_id INT,
    skill_id INT,
    notoriety FLOAT,
    milestones_id INT,
    FOREIGN KEY (artists_id) REFERENCES artists(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id),
    FOREIGN KEY (milestones_id) REFERENCES milestones(id)
);`.execute(trx);

    await sql`CREATE TABLE single (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    artist_hired_id INT,
    genre_id INT,
    note FLOAT,
    listener INT,
    money_earned INT,
    exp_value INT,
    FOREIGN KEY (artist_hired_id) REFERENCES artist_hired(id),
    FOREIGN KEY (genre_id) REFERENCES genre(id)
);`.execute(trx);

    await sql`CREATE TABLE album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    note FLOAT,
    buyer INT,
    money_earned INT,
    genre_id INT,
    exp_value INT,
    artist_id INT,
    FOREIGN KEY (genre_id) REFERENCES genre(id),
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);`.execute(trx);

    await sql`CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job VARCHAR(255),
    bonus INT,
    price INT,
    exp_value INT
);`.execute(trx);

    await sql`CREATE TABLE entourage (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job VARCHAR(255),
    bonus INT,
    price  INT,
    exp_value INT
);`.execute(trx);

    await sql`CREATE TABLE marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    bonus INT,
    price INT,
    exp_value INT
);`.execute(trx);

    await sql`CREATE TABLE artist_hired_skill (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artist_hired_id INT,
  skill_id INT,
  score INT,
  FOREIGN KEY (artist_hired_id) REFERENCES artist_hired(id),
  FOREIGN KEY (skill_id) REFERENCES skill(id)
);`.execute(trx);

    await sql`CREATE TABLE artist_skill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artist_hired_id INT,
    skill_id INT,
    score INT,
    FOREIGN KEY (artist_hired_id) REFERENCES artist_hired(id),
    FOREIGN KEY (skill_id) REFERENCES skill(id)
);`.execute(trx);

    await sql`CREATE TABLE entourage_hired (
    id INT AUTO_INCREMENT PRIMARY KEY,
    entourage_id INT,
    artist_id INT,
    FOREIGN KEY (artist_id) REFERENCES artist(id)
);`.execute(trx);

    await sql`CREATE TABLE staff_label (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT,
    label_id INT,
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (label_id) REFERENCES label(id)
);`.execute(trx);

    await sql`CREATE TABLE label_artist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label_id INT,
    artist_hired_id INT,
    FOREIGN KEY (label_id) REFERENCES label(id),
    FOREIGN KEY (artist_hired_id) REFERENCES artist_hired(id)
);`.execute(trx);

    await sql`CREATE TABLE single_album (
    id INT AUTO_INCREMENT PRIMARY KEY,
    single_id INT,
    album_id INT,
    FOREIGN KEY (single_id) REFERENCES single(id),
    FOREIGN KEY (album_id) REFERENCES album(id)
);`.execute(trx);

    await sql`CREATE TABLE artist_marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketing_id INT,
    single_id INT,
    album_id INT,
    FOREIGN KEY (marketing_id) REFERENCES marketing(id),
    FOREIGN KEY (single_id) REFERENCES single(id),
    FOREIGN KEY (album_id) REFERENCES album(id)
);`.execute(trx);

    await sql`CREATE TABLE album_marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketing_id INT,
    album_id INT,
    FOREIGN KEY (marketing_id) REFERENCES marketing(id),
    FOREIGN KEY (album_id) REFERENCES album(id)
);`.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS album_marketing;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artist_marketing ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS single_album ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS label_artist ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS staff_label ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS entourage_hired ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS  artist_skill ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artist_hired_skill ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS marketing  ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS entourage ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS staff ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS album;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS single ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artist_hired  ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artists ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS genre ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS skill  ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS milestones;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS user  ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS label ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS logo ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS level;
    `.execute(trx);
  });
}
