import { notFound } from 'next/navigation';
import React from 'react';
import { getFruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';
import FruitCommentForm from './FruitCommentForm';

export default async function SingleFruitPage(props) {
  const fruit = getFruit(Number((await props.params).fruitId));

  const fruitCommentsCookie = await getCookie('fruitsComments');

  let fruitComments = parseJson(fruitCommentsCookie) || [];

  if (!fruit) {
    return notFound();
  }

  if (!Array.isArray(fruitComments)) {
    fruitComments = [];
  }

  const fruitCommentToDisplay = fruitComments.find((fruitComment) => {
    return fruitComment.id === fruit.id;
  });

  return (
    <>
      <h1>
        {fruit.name} {fruit.icon}
      </h1>
      {/* Optional Chaining, means if FruitCommentToDisplay === undefined, return undefined, else displays fruitCommentToDisplay.comment */}
      <div>{fruitCommentToDisplay?.comment}</div>
      <FruitCommentForm fruitId={fruit.id} />
    </>
  );
}
