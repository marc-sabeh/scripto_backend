CREATE DATABASE scripto_backend;

Create table users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255)
);

Create table movies(
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255),
    rating VARCHAR(255),
);


Create table ratings(
    id SERIAL PRIMARY KEY,
    rating VARCHAR(255),
)