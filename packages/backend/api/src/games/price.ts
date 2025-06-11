import express from 'express';

import { db } from '@app/backend-shared';

const getPriceRouter = express.Router();
function getPrice() {
  return db.selectFrom('price').select('price');
}
export type Price = Awaited<
  ReturnType<ReturnType<typeof getPrice>['execute']>
>[number];
getPriceRouter.get('/price-singles', async (req, res) => {
  try {
    const price = await getPrice()
      .where('name', '=', 'singles')
      .executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});
getPriceRouter.get('/price-albums', async (req, res) => {
  try {
    const price = await getPrice()
      .where('name', '=', 'albums')
      .executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});
getPriceRouter.get('/price-stats', async (req, res) => {
  try {
    const price = await getPrice()
      .where('name', '=', 'stats')
      .executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getPriceRouter;
