CREATE DATABASE PRODUCT;

CREATE TABLE product(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    stoct INT NOT NULL,
    price INT NOT NULL,
    category_id integer REFERENCES category (id)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

DROP TABLE product CASCADE;

SELECT * FROM category;

SELECT * FROM category WHERE id=13;

INSERT INTO category(id,name) VALUES(13,’kursi’);

INSERT INTO category(name) VALUES(’kursi’);

UPDATE category SET name ='makanan' WHERE id=13;

DELETE FROM category WHERE id=13;