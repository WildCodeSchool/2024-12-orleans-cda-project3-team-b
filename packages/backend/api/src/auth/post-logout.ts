import express from 'express';

const postLogOutRouter = express.Router();

postLogOutRouter.post('/logout', (req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({
    ok: true,
  });
});

export default postLogOutRouter;
