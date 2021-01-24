import auth from '../controllers/authController';

export const routes = app => {
  app.post('/api/auth/signup', auth.signUp);
};
