'use client';

import { useState } from 'react';
import createOrUpdateCookie from './actions';

type Props = {
  fruitId: number;
};

export default function FruitCommentForm(props: Props) {
  const [comment, setComment] = useState('');

  // Option 2: If you use a function declared elsewhere, you need to define the type of `event`
  // function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
  //   setComment(event.currentTarget.value)
  // }

  return (
    <form>
      <textarea
        value={comment}
        // Option 1: Inline function does not require type
        onChange={(event) => setComment(event.currentTarget.value)}

        // Option 2: If you use a function declared elsewhere...
        // onChange={handleChange}
      />
      <button formAction={() => createOrUpdateCookie(props.fruitId, comment)}>
        Add comment
      </button>
    </form>
  );
}
