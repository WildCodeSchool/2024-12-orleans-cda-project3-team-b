import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // label
  await db.transaction().execute(async (trx) => {
    await sql`
      ALTER TABLE labels RENAME TO label;
    `.execute(trx);

    // user

    await sql`
      ALTER TABLE users MODIFY labels_id INT NULL;
    `.execute(trx);

    await db.transaction().execute(async (trx) => {
      await sql`
      ALTER TABLE users MODIFY is_first_time BOOLEAN DEFAULT TRUE NOT NULL;
    `.execute(trx);

      await sql`
    ALTER TABLE users CHANGE labels_id label_id INT NULL;
    `.execute(trx);

      await sql`
    ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
    `.execute(trx);

      await sql`ALTER TABLE users
ADD CONSTRAINT label_ibfk_1
FOREIGN KEY (label_id) REFERENCES labels(id);
`.execute(trx);

      // skills
      await sql` ALTER TABLE skills DROP score`.execute(trx);

      //artists_hired

      await sql`
      ALTER TABLE artists_hired change score grade INT NULL;
    `.execute(trx);

      // artists_skills
      await sql`
    ALTER TABLE artists_skills change artists_hired_id artists_id INT NOT NULL;
  `.execute(trx);

      await sql`
      ALTER TABLE artists_skills change score grade INT NULL;
    `.execute(trx);

      await sql`
    ALTER TABLE artists_skills DROP FOREIGN KEY artists_skills_ibfk_1;
    `.execute(trx);

      await sql`ALTER TABLE artists_skills
ADD CONSTRAINT artists_id_ibfk_1
FOREIGN KEY (artists_id) REFERENCES artists(id);
`.execute(trx);

      //staff_label

      await sql`
     ALTER TABLE staff_label change labels_id label_id INT NOT NULL;
    `.execute(trx);

      await sql`
    ALTER TABLE staff_label DROP FOREIGN KEY staff_label_ibfk_2;
    `.execute(trx);

      await sql`ALTER TABLE artists_skills
ADD CONSTRAINT staff_label_ibfk_2
FOREIGN KEY (label_id) REFERENCES label(id);
`.execute(trx);

      // label_artists

      await sql`
      RENAME TABLE artists_marketing TO singles_marketing;
    `.execute(trx);
    });
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
    RENAME TABLE label TO labels;
  `.execute(trx);

    // user
    await sql`
ALTER TABLE users MODIFY labels_id INT NOT NULL; 
ALTER TABLE is_first_time BOOLEAN NOT NULL DEFAULT TRUE,
`.execute(trx);

    await db.transaction().execute(async (trx) => {
      await sql`
ALTER TABLE is_first_time BOOLEAN DEFAULT TRUE NOT NULL ,
`.execute(trx);

      await sql`
  ALTER TABLE users CHANGE label_id labels_id INT NULL;
  `.execute(trx);

      await sql`
  ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
  `.execute(trx);

      await sql`ALTER TABLE users
ADD CONSTRAINT label_ibfk_1
FOREIGN KEY (labels_id) REFERENCES labels(id);
`.execute(trx);

      // skills
      await sql` ALTER TABLE skills CREATE score INT NOT NULL`.execute(trx);

      //artists_hired

      await sql`
    ALTER TABLE artists_hired change grade score INT NOT NULL;
  `.execute(trx);

      // artists_skills
      await sql`
  ALTER TABLE artists_skills change artists_id artists_hired_id INT NOT NULL;
`.execute(trx);

      await sql`
    ALTER TABLE artists_skills change grade score INT NOT NULL;
  `.execute(trx);

      await sql`
  ALTER TABLE artists_skills DROP FOREIGN KEY artists_skills_ibfk_1;
  `.execute(trx);

      await sql`ALTER TABLE artists_skills
ADD CONSTRAINT artists_skills_ibfk_1
FOREIGN KEY (artists_hired_id) REFERENCES artists_hired(id);
`.execute(trx);

      //staff_label

      await sql`
   ALTER TABLE staff_label change label_id labels_id INT NOT NULL;
  `.execute(trx);

      await sql`
  ALTER TABLE staff_label DROP FOREIGN KEY staff_label_ibfk_2;
  `.execute(trx);

      await sql`ALTER TABLE artists_skills
ADD CONSTRAINT staff_label_ibfk_2
FOREIGN KEY (labels_id) REFERENCES labels(id);
`.execute(trx);

      // label_artists

      await sql`
    RENAME TABLE singles_marketing TO artists_marketing;
  `.execute(trx);
    });
  });
}
