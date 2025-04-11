import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`CREATE TABLE levels (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value INT NOT NULL
  );`.execute(trx);

    await sql`CREATE TABLE logos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      logo_img VARCHAR(255) NOT NULL
  );`.execute(trx);

    await sql`
    CREATE TABLE label (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        logos_id INT NOT NULL,
        budget FLOAT NOT NULL,
        notoriety FLOAT NOT NULL,
        levels_id INT  NOT NULL,
        score_xp INT NOT NULL,
        FOREIGN KEY (logos_id) REFERENCES logos(id),
        FOREIGN KEY (levels_id) REFERENCES levels(id)
    );`.execute(trx);

    await sql`
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_first_time BOOLEAN  DEFAULT TRUE NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    label_id INT NULL,
    FOREIGN KEY (label_id) REFERENCES label(id)
);`.execute(trx);

    await sql`
CREATE TABLE milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value INT NOT NULL
);
`.execute(trx);

    await sql`CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    exp_value INT  NOT NULL
);`.execute(trx);

    await sql`CREATE TABLE genres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);`.execute(trx);
    await sql`CREATE TABLE artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) DEFAULT NULL,
    lastname VARCHAR(255) DEFAULT NULL,
    alias VARCHAR(255) DEFAULT NULL,
    notoriety FLOAT NOT NULL,
    genres_id INT NOT NULL,
    milestones_id INT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    exp_value INT NOT NULL,
    FOREIGN KEY (genres_id) REFERENCES genres(id),
    FOREIGN KEY (milestones_id) REFERENCES milestones(id)
);`.execute(trx);

    await sql`CREATE TABLE artists_hired (
    id INT AUTO_INCREMENT PRIMARY KEY,
    artists_id INT NOT NULL,
    notoriety FLOAT NOT NULL,
    milestones_id INT NOT NULL,
    FOREIGN KEY (artists_id) REFERENCES artists(id),
    FOREIGN KEY (milestones_id) REFERENCES milestones(id)
);`.execute(trx);

    await sql`CREATE TABLE singles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    artists_hired_id INT NOT NULL,
    genres_id INT NOT NULL,
    score FLOAT NOT NULL,
    listeners INT NOT NULL,
    money_earned INT NOT NULL,
    exp_value INT NOT NULL,
    FOREIGN KEY (artists_hired_id) REFERENCES artists_hired(id),
    FOREIGN KEY (genres_id) REFERENCES genres(id)
);`.execute(trx);

    await sql`CREATE TABLE albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score FLOAT NOT NULL,
    sales INT NOT NULL,
    money_earned INT NOT NULL,
    genres_id INT NOT NULL,
    exp_value INT NOT NULL,
    artists_id INT NOT NULL,
    FOREIGN KEY (genres_id) REFERENCES genres(id),
    FOREIGN KEY (artists_id) REFERENCES artists(id)
);`.execute(trx);

    await sql`CREATE TABLE staff (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job VARCHAR(255) NOT NULL,
    bonus INT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    exp_value INT NOT NULL
);`.execute(trx);

    await sql`CREATE TABLE crew_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job VARCHAR(255) NOT NULL,
    bonus INT NOT NULL,
    price  INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    exp_value INT NOT NULL
);`.execute(trx);

    await sql`CREATE TABLE marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255)  NOT NULL,
    bonus INT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    exp_value INT NOT NULL
);`.execute(trx);

    await sql`CREATE TABLE artists_hired_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artists_hired_id INT NOT NULL,
  skills_id INT NOT NULL,
  grade INT NULL,
  FOREIGN KEY (artists_hired_id) REFERENCES artists_hired(id),
  FOREIGN KEY (skills_id) REFERENCES skills(id)
);`.execute(trx);

    await sql`CREATE TABLE artists_skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  artists_id INT NOT NULL,
  skills_id INT NOT NULL,
  grade INT NULL,
  FOREIGN KEY (artists_id) REFERENCES artists(id),
  FOREIGN KEY (skills_id) REFERENCES skills(id)
);`.execute(trx);

    await sql`CREATE TABLE crew_members_hired (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crew_members_id INT NOT NULL,
    artists_id INT NOT NULL,
    FOREIGN KEY (artists_id) REFERENCES artists(id)
);`.execute(trx);

    await sql`CREATE TABLE staff_label (
    id INT AUTO_INCREMENT PRIMARY KEY,
    staff_id INT NOT NULL,
    label_id INT NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (label_id) REFERENCES label(id)
);`.execute(trx);

    await sql`CREATE TABLE label_artists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label_id INT NOT NULL,
    artists_hired_id INT NOT NULL,
    FOREIGN KEY (label_id) REFERENCES label(id),
    FOREIGN KEY (artists_hired_id) REFERENCES artists_hired(id)
);`.execute(trx);

    await sql`CREATE TABLE singles_albums (
    id INT AUTO_INCREMENT PRIMARY KEY,
    singles_id INT NOT NULL,
    albums_id INT NOT NULL,
    FOREIGN KEY (singles_id) REFERENCES singles(id),
    FOREIGN KEY (albums_id) REFERENCES albums(id)
);`.execute(trx);

    await sql`CREATE TABLE singles_marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketing_id INT NOT NULL,
    singles_id INT NOT NULL,
    FOREIGN KEY (marketing_id) REFERENCES marketing(id),
    FOREIGN KEY (singles_id) REFERENCES singles(id)
);`.execute(trx);

    await sql`CREATE TABLE albums_marketing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marketing_id INT NOT NULL,
    albums_id INT NOT NULL,
    FOREIGN KEY (marketing_id) REFERENCES marketing(id),
    FOREIGN KEY (albums_id) REFERENCES albums(id)
);`.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
      DROP TABLE IF EXISTS albums_marketing;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS singles_marketing;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS singles_albums;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS label_artists;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS staff_label;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS crew_members_hired;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artists_skills;
    `.execute(trx);

    await sql`
      DROP TABLE IF EXISTS artists_hired_skills;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS marketing ;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS crew_members;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS staff;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS albums;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS singles;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artists_hired;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS artists;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS genres;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS skills;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS milestones;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS users;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS label;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS logos;
    `.execute(trx);
    await sql`
      DROP TABLE IF EXISTS levels;
    `.execute(trx);
  });
}
