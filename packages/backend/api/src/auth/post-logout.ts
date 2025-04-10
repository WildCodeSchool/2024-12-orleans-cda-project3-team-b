import express from 'express';

const postLogOutRouter = express.Router();

postLogOutRouter.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    ok: true,
  });
});

export default postLogOutRouter;
