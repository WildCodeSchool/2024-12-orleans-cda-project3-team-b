import express from 'express';
import { send } from 'process';

const postLoginRouter = express.Router();

postLoginRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send();
});

export default postLoginRouter;
