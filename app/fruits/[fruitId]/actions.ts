'use server';

// Case A: cookie is undefined (not set)
// Case B: cookie set, id doesn't exist
// Case C: cookie set, id exists

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export type FruitComment = {
  id: number;
  comment: string;
};

export default async function createOrUpdateCookie(
  fruitId: FruitComment['id'],
  comment: FruitComment['comment'],
) {
  // 1. get current cookie!
  const fruitsCommentsCookie = await getCookie('fruitsComments');

  // 2. parse the cookie value
  const fruitsComments: FruitComment[] =
    fruitsCommentsCookie === undefined
      ? // Case A: cookie undefined
        []
      : parseJson(fruitsCommentsCookie)!;

  // 3. edit the cookie value
  const fruitToUpdate = fruitsComments.find((fruitComment) => {
    return fruitComment.id === fruitId;
  });

  // Case B: cookie set, id doesn't exist
  if (!fruitToUpdate) {
    fruitsComments.push({ id: fruitId, comment: comment });
  } else {
    // Case C: cookie set, id exists already
    fruitToUpdate.comment = comment;
  }

  // 4. we override the cookie
  (await cookies()).set('fruitsComments', JSON.stringify(fruitsComments));
}
