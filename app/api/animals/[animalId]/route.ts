// WARNING: You don't need this, because you can do a database

import { NextRequest, NextResponse } from 'next/server';
import {
  type Animal,
  deleteAnimalInsecure,
  getAnimalInsecure,
  updateAnimalInsecure,
} from '../../../../database/animals';
import { animalSchema } from '../../../../migrations/00000-createTableAnimals';

type AnimalResponseBodyGet =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

type AnimalParams = {
  params: Promise<{
    animalId: string;
  }>;
};

// query directly in your Server Component
export async function GET(
  request: NextRequest,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyGet>> {
  console.log(Number((await params).animalId));
  const animal = await getAnimalInsecure(Number((await params).animalId));

  if (!animal) {
    return NextResponse.json(
      {
        error: "Animal doesn't exist",
      },
      {
        status: 404,
      },
    );
  }

  console.log(animal);
  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyDelete =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function DELETE(
  request: NextRequest,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyDelete>> {
  console.log(Number((await params).animalId));

  const animal = await deleteAnimalInsecure({
    id: Number((await params).animalId),
  });

  if (!animal) {
    return NextResponse.json(
      {
        error: 'Animal not found',
      },
      {
        status: 404,
      },
    );
  }

  console.log(animal);
  return NextResponse.json({ animal: animal });
}

export type AnimalResponseBodyPut =
  | {
      animal: Animal;
    }
  | {
      error: string;
    };

export async function PUT(
  request: NextRequest,
  { params }: AnimalParams,
): Promise<NextResponse<AnimalResponseBodyPut>> {
  const requestBody = await request.json();

  const result = animalSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      {
        error: "Request doesn't contain animal object",
        errorIssues: result.error.issues,
      },
      {
        status: 400,
      },
    );
  }

  const updatedAnimal = await updateAnimalInsecure({
    id: Number((await params).animalId),
    firstName: result.data.firstName,
    type: result.data.type,
    accessory: result.data.accessory || null,
    birthDate: result.data.birthDate,
  });

  if (!updatedAnimal) {
    return NextResponse.json(
      {
        error: 'Animal not found or access denied updating animal',
      },
      {
        status: 500,
      },
    );
  }

  return NextResponse.json({
    animal: updatedAnimal,
  });
}
