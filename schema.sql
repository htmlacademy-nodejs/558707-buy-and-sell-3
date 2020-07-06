DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_offers;
DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS offers_categories;
DROP TABLE IF EXISTS offers_comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS types;
DROP TABLE IF EXISTS comments;

CREATE TABLE users
(
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL,
	email VARCHAR (100) NOT NULL,
	password VARCHAR (100) NOT NULL,
	avatar TEXT NOT NULL
);

CREATE TABLE types
(
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

CREATE TABLE offers
(
	id SERIAL PRIMARY KEY,
	title VARCHAR (100) NOT NULL,
	announce VARCHAR (55) NOT NULL,
	publication_date DATE,
	description VARCHAR (1000) NOT NULL,
	type_id INTEGER,
	price MONEY NOT NULL,
	picture TEXT NOT NULL,
	FOREIGN KEY (type_id) REFERENCES types (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE TABLE categories
(
	id SERIAL PRIMARY KEY,
	name VARCHAR (100) NOT NULL
);

CREATE TABLE comments
(
	id SERIAL PRIMARY KEY,
	comment TEXT NOT NULL,
	user_id INTEGER,
	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE TABLE users_offers
(
	user_id INTEGER NOT NULL,
	offer_id INTEGER NOT NULL,
	CONSTRAINT users_offers_pk PRIMARY KEY (user_id, offer_id),
  	FOREIGN KEY (user_id) REFERENCES users (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (offer_id) REFERENCES offers (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);

CREATE TABLE offers_categories
(
	offer_id INTEGER NOT NULL,
	category_id INTEGER NOT NULL,
	CONSTRAINT offers_categories_pk PRIMARY KEY (offer_id, category_id),
  	FOREIGN KEY (offer_id) REFERENCES offers (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (category_id) REFERENCES categories (id)
		ON DELETE SET NULL
		ON UPDATE SET NULL
);

CREATE TABLE offers_comments
(
	offer_id INTEGER NOT NULL,
	comment_id INTEGER NOT NULL,
	CONSTRAINT offers_comments_pk PRIMARY KEY (offer_id, comment_id),
  	FOREIGN KEY (offer_id) REFERENCES offers (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
	FOREIGN KEY (comment_id) REFERENCES comments (id)
		ON DELETE CASCADE
		ON UPDATE CASCADE
);