import models from '../models';
import {
  comparePassword,
  hashPassword,
  jwtToken,
  getRndInteger,
} from '../utils';

const { User, Account } = models;

const auth = {
  async signUp(req, res, next) {
    try {
      const { username, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({
        username: username.toLowerCase(),
        password: hash,
      });

      const { id } = user;
      const accountNumberRand = Date.now() + getRndInteger(0, 999999);
      console.log('accountNumberRand', accountNumberRand);

      const account = await Account.create({
        userId: id,
        balance: 100,
        accountNumber: accountNumberRand,
      });

      const { balance, accountNumber } = account;

      const token = jwtToken.createToken(username);
      return res
        .status(201)
        .send({ token, user: { id, username, accountNumber, balance } });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async signIn(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });

      if (user && comparePassword(password, user.password)) {
        const { id, username } = user;

        const { balance, accountNumber } = await user.getAccount();

        const token = jwtToken.createToken(user);
        return res.status(200).send({
          token,
          user: {
            id,
            username,
            balance,
            accountNumber,
          },
        });
      }
      return res
        .status(400)
        .send({ error: 'Invalid username/password combination' });
    } catch (e) {
      return next(new Error(e));
    }
  },
};

export default auth;
