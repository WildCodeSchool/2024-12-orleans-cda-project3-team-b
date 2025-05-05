import express from 'express';

import artistsRouter from './artists';
import artistsHiredRouter from './artists-hired';

const fetchRouter = express.Router();
fetchRouter.use(artistsHiredRouter);
fetchRouter.use(artistsRouter);

export default fetchRouter;
