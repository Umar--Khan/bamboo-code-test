import jwt from 'jsonwebtoken';
import bcrpyt from 'bcryptjs';
import { config } from 'dotenv';

config();

const options = {
  expiresIn: '24h',
};

export const jwtToken = {
  createToken({ id, username }) {
    return jwt.sign({ id, username }, process.env.JWT_SECRET, options);
  },
  verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET, options);
  },
};

export const hashPassword = password => bcrpyt.hashSync(password, 10);
export const comparePassword = (password, hash) =>
  bcrpyt.compareSync(password, hash);
