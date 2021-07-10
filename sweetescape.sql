CREATE DATABASE sweetescape;
USE sweetescape;

CREATE TABLE users (
    id_user integer auto_increment not null,
    firstname varchar(50),
    email varchar(100),
    password varchar(25),
    birthday date,
    country varchar(50),
    description varchar(500),
    PRIMARY KEY(id_user)
)

CREATE TABLE tips (
    id_tip integer auto_increment not null,
    place_name varchar(50),
    description varchar(300),
    city varchar(50),
    country varchar(50),
    publish date,
    type varchar(50),
    user_id integer,
    PRIMARY KEY(id_tip),
    FOREIGN KEY(user_id) references users(id_user)
)