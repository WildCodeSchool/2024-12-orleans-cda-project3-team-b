import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    // labels
    await sql`
    ALTER TABLE labels MODIFY levels_id INT DEFAULT 1;
    `.execute(trx);

    await sql`
    ALTER TABLE labels ADD users_id INT NOT NULL;
    `.execute(trx);

    await sql`
    ALTER TABLE labels
    ADD CONSTRAINT labels_ibfk_3
    FOREIGN KEY (users_id) REFERENCES users(id);
    `.execute(trx);

    //user

    await sql`
    ALTER TABLE users MODIFY is_first_time BOOLEAN NOT NULL DEFAULT TRUE;
    `.execute(trx);

    await sql`
    ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
    `.execute(trx);

    await sql`
    ALTER TABLE users DROP labels_id;
    `.execute(trx);

    // skills
    await sql` ALTER TABLE skills DROP score;`.execute(trx);

    //artists_hired

    await sql`
    ALTER TABLE artists_hired ADD grade INT NULL;
    `.execute(trx);

    await sql`ALTER TABLE artists_hired MODIFY milestones_id INT NULL`.execute(
      trx,
    );

    // artists_skills
    await sql`
    ALTER TABLE artists_skills change artists_hired_id artists_id INT NOT NULL;
    `.execute(trx);

    await sql`
    ALTER TABLE artists_skills change score grade INT NULL;
    `.execute(trx);

    //staff_label

    await sql`
    ALTER TABLE staff_label MODIFY labels_id INT NULL;`.execute(trx);

    // label_artists
    await sql`
    ALTER TABLE label_artists change labels_id label_id INT NOT NULL;
    `.execute(trx);

    // artists_marketing
    await sql`
    RENAME TABLE artists_marketing TO singles_marketing ;
    `.execute(trx);

    await sql`
    ALTER TABLE singles_marketing DROP FOREIGN KEY singles_marketing_ibfk_3;
    `.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    // artists_marketing

    await sql`
    ALTER TABLE singles_marketing
    ADD CONSTRAINT singles_marketing_ibfk_3
    FOREIGN KEY (albums_id) REFERENCES albums(id);
    `.execute(trx);

    await sql`
    RENAME TABLE singles_marketing TO artists_marketing;
    `.execute(trx);

    // label_artists
    await sql`
    ALTER TABLE label_artists change label_id labels_id INT NOT NULL;
    `.execute(trx);

    //staff_label

    await sql`
    ALTER TABLE staff_label MODIFY labels_id INT NOT NULL;`.execute(trx);

    // artists_skills

    await sql`
    ALTER TABLE artists_skills change grade score INT NOT NULL;
    `.execute(trx);

    await sql`
    ALTER TABLE artists_skills change artists_id artists_hired_id INT NOT NULL;
    `.execute(trx);

    //artists_hired
    await sql`ALTER TABLE artists_hired MODIFY milestones_id INT NOT NULL`.execute(
      trx,
    );

    await sql`
    ALTER TABLE artists_hired DROP COLUMN grade;
    `.execute(trx);

    // skills
    await sql` ALTER TABLE skills ADD score INT NOT NULL;`.execute(trx);

    //user

    await sql`
    ALTER TABLE users MODIFY is_first_time BOOLEAN NOT NULL;
    `.execute(trx);

    await sql`
    ALTER TABLE users ADD labels_id INT  NOT NULL;
    `.execute(trx);

    await sql`
    ALTER TABLE users
    ADD CONSTRAINT users_ibfk_1
    FOREIGN KEY (labels_id) REFERENCES labels(id);
    `.execute(trx);

    // label

    await sql`
    ALTER TABLE labels DROP FOREIGN KEY labels_ibfk_3;
    `.execute(trx);

    await sql`
    ALTER TABLE labels DROP users_id;
    `.execute(trx);

    await sql`
    ALTER TABLE labels MODIFY levels_id INT NOT NULL;`.execute(trx);
  });
}
