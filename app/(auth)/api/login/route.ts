import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import { getUserWithPasswordHashInsecure } from '../../../../database/users';
import {
  type User,
  userSchema,
} from '../../../../migrations/00006-createTableUsers';

export type LoginResponseBody =
  | {
      user: { username: User['username'] };
    }
  | {
      errors: { message: string }[];
    };

export async function POST(
  request: Request,
): Promise<NextResponse<LoginResponseBody>> {
  // Task: Implement the user login workflow

  // 1. Get the user data from the request
  const requestBody = await request.json();

  // 2. Validate the user data with zod
  const result = userSchema.safeParse(requestBody);

  if (!result.success) {
    return NextResponse.json(
      { errors: result.error.issues },
      {
        status: 400,
      },
    );
  }

  // 3. verify the user credentials
  const userWithPasswordHash = await getUserWithPasswordHashInsecure(
    result.data.username,
  );

  if (!userWithPasswordHash) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  // 4. Validate the user password by comparing with hashed password
  const isPasswordValid = await bcrypt.compare(
    result.data.password,
    userWithPasswordHash.passwordHash,
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      {
        errors: [
          {
            message: 'Username or Password is invalid',
          },
        ],
      },
      {
        status: 400,
      },
    );
  }

  return NextResponse.json({
    user: {
      username: userWithPasswordHash.username,
    },
  });
}
