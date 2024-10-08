import Image from 'next/image';
import React from 'react';
import { getAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/date';

export async function generateMetadata(props) {
  const singleAnimal = await getAnimalInsecure(
    Number((await props.params).animalId),
  );
  return {
    title: singleAnimal.firstName,
    description: 'This is my single animal page ',
  };
}

export default async function AnimalPage(props) {
  const singleAnimal = await getAnimalInsecure(
    Number((await props.params).animalId),
  );

  const currentDate = new Date();

  const daysUntilNextBirthDay = getDaysUntilNextBirthday(
    currentDate,
    singleAnimal.birthDate,
  );

  return (
    <div>
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth date: {formatDate(singleAnimal.birthDate)}</div>
      <div>Days left until birthday: {daysUntilNextBirthDay}</div>
      <div>
        <Image
          src={`/images/${singleAnimal.firstName.toLowerCase()}.webp`}
          alt={singleAnimal.firstName}
          width={300}
          height={300}
        />
        this is a {singleAnimal.type} carrying {singleAnimal.accessory}
      </div>
    </div>
  );
}
