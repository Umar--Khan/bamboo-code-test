import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { User } from '../models';

config();

export default (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      expires: '24h',
    },
    (error, decoded) => {
      if (error) {
        return res.status(401).send({ error });
      }
      req.decoded = decoded;
      User.findByPk(decoded.userId).then(user => {
        if (!user) {
          return res.status(401).send({ error: 'User does not exist' });
        }
        next();
      });
    },
  );
};
