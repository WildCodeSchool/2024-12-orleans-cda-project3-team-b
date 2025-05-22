import { type Kysely, sql } from 'kysely';

import type { DB } from '@app/shared';

export async function up(db: Kysely<DB>): Promise<void> {
  // Migration code that update the database to the desired state.
  await db.transaction().execute(async (trx) => {
    await sql`
    ALTER TABLE albums
  DROP FOREIGN KEY albums_ibfk_2;`.execute(trx);

    await sql`
    ALTER TABLE albums change artists_id artists_hired_id INT NOT NULL;`.execute(
      trx,
    );

    await sql`
  ALTER TABLE albums
  ADD CONSTRAINT albums_ibfk_2
  FOREIGN KEY (artists_hired_id) REFERENCES artists_hired(id);
`.execute(trx);
  });
}

export async function down(db: Kysely<DB>): Promise<void> {
  // Migration code that reverts the database to the previous state.
  await db.transaction().execute(async (trx) => {
    await sql`
    ALTER TABLE albums change artists_hired_id artists_id INT NOT NULL;`.execute(
      trx,
    );

    await sql`
    ALTER TABLE albums DROP FOREIGN KEY albums_ibfk_2;
    `.execute(trx);

    await sql`
    ALTER TABLE albums
ADD CONSTRAINT albums_ibfk_2
FOREIGN KEY (artists_id) REFERENCES artists(id); 
    `.execute(trx);
  });
}
