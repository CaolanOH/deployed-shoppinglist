CREATE DATABASE shoppinglist_db;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255),
    budget NUMERIC(6,2)
);

CREATE TABLE items(
    id SERIAL,
    description VARCHAR(100),
    price NUMERIC(6,2),
    date VARCHAR(300),
    user_id INTEGER REFERENCES users(id)
);


INSERT INTO items(description, price, date, user_id, date, user_id)
VALUES(0)