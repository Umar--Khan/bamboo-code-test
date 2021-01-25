import { User } from '../models';

export default async (req, res, next) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).send({ error: 'username is required' });
  }
  if (!password) {
    return res.status(400).send({ error: 'password is required' });
  }

  const user = await User.findOne({ where: { username } });
  if (user) {
    return res.status(409).send({ error: 'username already exists' });
  }

  next();
};
