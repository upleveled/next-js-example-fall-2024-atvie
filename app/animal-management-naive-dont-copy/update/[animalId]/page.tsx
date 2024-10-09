import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

type Props = {
  params: Promise<{
    animalId: string;
  }>;
  searchParams: Promise<{
    firstName: string;
    type: string;
    accessory: string;
    birthDate: string;
  }>;
};

export default async function UpdateAnimalNaivePage(props: Props) {
  const animalSearchParams = await props.searchParams;

  const animal = await updateAnimalInsecure({
    id: Number((await props.params).animalId),
    firstName: animalSearchParams.firstName,
    type: animalSearchParams.type,
    accessory: animalSearchParams.accessory,
    birthDate: new Date(animalSearchParams.birthDate),
  });

  if (!animal) notFound();

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}
