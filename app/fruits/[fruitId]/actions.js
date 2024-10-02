'use server';

// Case A: cookie is undefined (not set)
// Case B: cookie set, id doesn't exist
// Case C: cookie set, id exists

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export default async function createOrUpdateCookie(fruitId, comment) {
  // 1. get current cookie!
  const fruitsCommentsCookie = await getCookie('fruitsComments');

  // 2. parse the cookie value
  const fruitsComments =
    fruitsCommentsCookie === undefined
      ? // Case A: cookie undefined
        []
      : parseJson(fruitsCommentsCookie);

  // 3. edit the cookie value
  const fruitToUpdate = fruitsComments.find((fruitComment) => {
    return fruitComment.id === fruitId;
  });

  // Case B: cookie set, id doesn't exist
  fruitsComments.push({ id: fruitId, comment: comment });
  if (!fruitToUpdate) {
  } else {
    // Case C: cookie set, id exists already
    fruitToUpdate.comment = comment;
  }

  // 4. we override the cookie
  (await cookies()).set('fruitsComments', JSON.stringify(fruitsComments));
}
