CREATE DATABASE bambank;

CREATE TABLE user_info(
    user_info_id serial PRIMARY KEY,
    name VARCHAR (255),
    password VARCHAR (255),
    balance INT
);
