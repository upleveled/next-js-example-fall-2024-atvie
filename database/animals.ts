import { cache } from 'react';
import type {
  AnimalsFoods,
  AnimalWithFoods,
} from '../migrations/00004-createTableAnimalFoods';
import { sql } from './connect';

// This data is now coming from the database
// const animals = [
//   {
//     id: 1,
//     firstName: 'Lucia',
//     type: 'Cat',
//     accessory: 'House',
//     birthDate: new Date('2020-06-23'),
//   },
//   {
//     id: 2,
//     firstName: 'Bili',
//     type: 'Capybaras',
//     accessory: 'Car',
//     birthDate: new Date('2020-06-23'),
//   },
//   {
//     id: 3,
//     firstName: 'Jojo',
//     type: 'Dog',
//     accessory: 'Bike',
//     birthDate: new Date('2020-06-23'),
//   },
//   {
//     id: 4,
//     firstName: 'Macca',
//     type: 'Elephant',
//     accessory: 'Key',
//     birthDate: new Date('2020-06-23'),
//   },
//   {
//     id: 5,
//     firstName: 'Fro',
//     type: 'Duck',
//     accessory: 'Motor',
//     birthDate: new Date('2020-06-23'),
//   },
// ];

type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
  birthDate: Date;
};

export const getAnimalsInsecure = cache(async () => {
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
  `;

  return animals;
});

export const getAnimalInsecure = cache(async (id: number) => {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;

  // Alternative to destructuring: access using [0]
  // const animal = (await sql<Animal[]>`
  //   SELECT
  //     *
  //   FROM
  //     animals
  //   WHERE
  //     id = ${id}
  // `)[0];

  return animal;
});

export const getAnimalsFoodsInsecure = cache(async (id: number) => {
  const animalsFoods = await sql<AnimalsFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      animals.birth_date animal_birth_date,
      foods.id AS animal_food_id,
      foods.name AS animal_food_name,
      foods.type AS animal_food_type
    FROM
      animals
      LEFT JOIN animal_foods ON animals.id = animal_foods.animal_id
      LEFT JOIN foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
  `;

  return animalsFoods;
});

export const getAnimalWithFoodsInsecure = cache(async (id: number) => {
  const [animal] = await sql<AnimalWithFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      -- Return empty array instead of [null] if no food is found
      coalesce(
        json_agg(foods.*) FILTER (
          WHERE
            foods.id IS NOT NULL
        ),
        '[]'
      ) AS animal_foods
    FROM
      animals
      LEFT JOIN animal_foods ON animals.id = animal_foods.animal_id
      LEFT JOIN foods ON foods.id = animal_foods.food_id
    WHERE
      animals.id = ${id}
    GROUP BY
      animals.first_name,
      animals.type,
      animals.accessory,
      animals.id
  `;

  return animal;
});

export const createAnimalInsecure = cache(
  async (newAnimal: Omit<Animal, 'id'>) => {
    const [animal] = await sql<Animal[]>`
      INSERT INTO
        animals (
          first_name,
          type,
          accessory,
          birth_date
        )
      VALUES
        (
          ${newAnimal.firstName},
          ${newAnimal.type},
          ${newAnimal.accessory},
          ${newAnimal.birthDate}
        )
      RETURNING
        animals.*
    `;

    return animal;
  },
);

export const updateAnimalInsecure = cache(async (updatedAnimal: Animal) => {
  const [animal] = await sql<Animal[]>`
    UPDATE animals
    SET
      first_name = ${updatedAnimal.firstName},
      type = ${updatedAnimal.type},
      accessory = ${updatedAnimal.accessory},
      birth_date = ${updatedAnimal.birthDate}
    WHERE
      id = ${updatedAnimal.id}
    RETURNING
      animals.*
  `;

  return animal;
});

export const deleteAnimalInsecure = cache(
  async (deletedAnimal: Pick<Animal, 'id'>) => {
    const [animal] = await sql<Animal[]>`
      DELETE FROM animals
      WHERE
        id = ${deletedAnimal.id}
      RETURNING
        animals.*
    `;

    return animal;
  },
);
