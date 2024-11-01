import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import {
  type Animal,
  createAnimal,
  getAnimalsInsecure,
} from '../../../database/animals';
import { animalSchema } from '../../../migrations/00000-createTableAnimals';

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

export type AnimalsResponseBodyPost =
  | {
      animal: Animal;
    }
  | {
      error: string;
      errorIssues?: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<AnimalsResponseBodyPost>> {
  // get body from client and parse it
  const requestBody = await request.json();

  // validate information from client
  const result = animalSchema.safeParse(requestBody);

  // If client sends request body with incorrect data,
  // return a response with a 400 status code to the client
  if (!result.success) {
    // error.issues [
    //   {
    //     code: 'invalid_type',
    //     expected: 'string',
    //     received: 'undefined',
    //     path: [ 'name' ],
    //     message: 'Required'
    //   }
    // ]
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

  // validation successful, add information to database and return the new animal
  // const newAnimal = await createAnimalInsecure({
  //   firstName: result.data.firstName,
  //   type: result.data.type,
  //   accessory: result.data.accessory || null,
  //   birthDate: result.data.birthDate,
  // });

  const sessionTokenCookie = (await cookies()).get('sessionToken');

  const newAnimal =
    sessionTokenCookie &&
    (await createAnimal(sessionTokenCookie.value, {
      firstName: result.data.firstName,
      type: result.data.type,
      accessory: result.data.accessory || null,
      birthDate: result.data.birthDate,
    }));

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
