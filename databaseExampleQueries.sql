-- This file is only my notes, changing
-- this file doesn't change anything in
-- the database
-- Create animals table
CREATE TABLE animals (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name varchar(30) NOT NULL,
  type varchar(30) NOT NULL,
  accessory varchar(30),
  birth_date date NOT NULL
);

INSERT INTO
  animals (
    first_name,
    type,
    accessory,
    birth_date
  )
VALUES
  (
    'Lucia',
    'Cat',
    'House',
    '2019-08-23'
  ),
  (
    'Bili',
    'Capybaras',
    'Car',
    '2010-06-13'
  ),
  (
    'Jojo',
    'Dog',
    'Bike',
    '2011-04-23'
  ),
  (
    'Macca',
    'Elephant',
    'Key',
    '2021-06-22'
  ),
  (
    'Fro',
    'Duck',
    'Motor',
    '2020-06-23'
  );

-- Read animal from the Database (R in CRUD - Read)
SELECT
  *
FROM
  animals;

CREATE DATABASE next_js_example_fall_2024_atvie;

CREATE USER next_js_example_fall_2024_atvie
WITH
  encrypted password 'next_js_example_fall_2024_atvie';

GRANT ALL privileges ON database next_js_example_fall_2024_atvie TO next_js_example_fall_2024_atvie;

-- \connect next_js_example_fall_2024_atvie
CREATE SCHEMA next_js_example_fall_2024_atvie AUTHORIZATION next_js_example_fall_2024_atvie;
