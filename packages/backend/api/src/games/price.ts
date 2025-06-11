import express from 'express';

import { db } from '@app/backend-shared';

const getPriceRouter = express.Router();
function getPrice() {
  return db.selectFrom('price').select('price');
}
export type Price = Awaited<
  ReturnType<ReturnType<typeof getPrice>['execute']>
>[number];
getPriceRouter.get('/price-single', async (req, res) => {
  try {
    const price = await getPrice().where('id', '=', 2).executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});
getPriceRouter.get('/price-albums', async (req, res) => {
  try {
    const price = await getPrice().where('id', '=', 3).executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});
getPriceRouter.get('/price-stats', async (req, res) => {
  try {
    const price = await getPrice().where('id', '=', 1).executeTakeFirst();
    res.json(price);
  } catch (_error) {
    res.json({
      ok: false,
    });
  }
});

export default getPriceRouter;
