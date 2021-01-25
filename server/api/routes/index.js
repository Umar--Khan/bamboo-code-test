import auth from '../controllers/auth';
import validateAuth from '../middlewares/auth';
import transactions from '../controllers/transactions';
import authorize from '../middlewares/authorize';

const BASE_API_URL = '/api/';

export const routes = app => {
  app.post(BASE_API_URL + 'auth/signup', validateAuth, auth.signUp);
  app.post(BASE_API_URL + 'auth/signin', auth.signIn);

  app.post(BASE_API_URL + 'transactions', authorize, transactions.create);
  app.get(BASE_API_URL + 'transactions', authorize, transactions.getAll);
};
