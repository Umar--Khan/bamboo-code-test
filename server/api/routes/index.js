import express from 'express';
import user from '../controllers/user';
import validateAuth from '../middlewares/auth';
import transactions from '../controllers/transactions';
import authorize from '../middlewares/authorize';

const appRouter = express.Router();

appRouter.post('/auth/signup', validateAuth, user.signUp);
appRouter.post('/auth/signin', user.signIn);

appRouter.post('/transactions', authorize, transactions.create);
appRouter.get('/transactions', authorize, transactions.getAll);

export default appRouter;
