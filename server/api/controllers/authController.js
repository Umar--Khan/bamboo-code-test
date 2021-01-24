import models from '../models';
import { hashPassword, jwtToken } from '../utils';

const { User } = models;

const auth = {
  async signUp(req, res, next) {
    try {
      const { username, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({
        username,
        password: hash,
        balance: 100,
      });
      const token = jwtToken.createToken(username);

      const { id, balance } = user;

      return res.status(201).send({ token, user: { id, username, balance } });
    } catch (e) {
      return next(new Error(e));
    }
  },
};

export default auth;
