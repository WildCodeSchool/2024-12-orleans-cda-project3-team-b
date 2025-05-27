import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    // skills
    await sql` ALTER TABLE skills ADD score INT NULL;`.execute(trx);

    //artists
    await sql` ALTER TABLE artists ADD skills_id INT NULL;`.execute(trx);

    //artists_hired
    await sql` ALTER TABLE artists DROP grade;`.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    // skills
    await sql` ALTER TABLE skills DROP score;`.execute(trx);

    //artists
    await sql` ALTER TABLE artists DROP skills_id;`.execute(trx);

    //artists_hired
    await sql` ALTER TABLE artists ADD grade INT NULL;`.execute(trx);
  });
}
