require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'bambank-test',
    use_env_variables: 'DB_DEV_URL',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'password',
    database: 'bambank-test',
    use_env_variables: 'DB_DEV_URL',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'password',
    database: 'bambank-test',
    use_env_variables: 'DB_DEV_URL',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};
