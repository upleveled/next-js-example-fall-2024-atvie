import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

export default async function UpdateAnimalNaivePage(props) {
  const animalSearchParams = await props.searchParams;

  const animal = await updateAnimalInsecure({
    id: await props.params.animalId,
    firstName: animalSearchParams.firstName,
    type: animalSearchParams.type,
    accessory: animalSearchParams.accessory,
    birthDate: new Date(animalSearchParams.birthDate),
  });

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}
