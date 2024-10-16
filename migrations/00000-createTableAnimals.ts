import type { Sql } from 'postgres';
import { z } from 'zod';

export const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
  // accessory: z.string().nullable()
  birthDate: z.coerce.date(),
});

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(40),
      birth_date date NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`DROP TABLE animals`;
}
