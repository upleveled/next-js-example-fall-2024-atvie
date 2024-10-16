import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  type Animal,
  createAnimalInsecure,
  getAnimalsInsecure,
} from '../../../database/animals';

type AnimalResponseBodyGet =
  | {
      animals: Animal[];
    }
  | {
      error: string;
    };

// WARNING: You don't need this, because you can do a database
// query directly in your Server Component
export async function GET(): Promise<NextResponse<AnimalResponseBodyGet>> {
  const animals = await getAnimalsInsecure();
  return NextResponse.json({ animals: animals });
}

export const animalSchema = z.object({
  firstName: z.string(),
  type: z.string(),
  accessory: z.string().optional(),
  // accessory: z.string().nullable()
  birthDate: z.coerce.date(),
});

type AnimalResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<AnimalResponseBodyPost>> {
  // get body from client
  const requestBody = await request.json();

  // validate information from client
  const result = animalSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'You need to send an object with animal information',
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  // validation successful, add information to database
  const newAnimal = await createAnimalInsecure({
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

  if (!newAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not created or access denied creating animal',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({ animal: newAnimal });
}
