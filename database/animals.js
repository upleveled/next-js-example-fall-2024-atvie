import 'server-only';

const animals = [
  {
    id: 1,
    firstName: 'Lucia',
    type: 'Cat',
    accessory: 'House',
    birthDate: new Date('2020-06-23'),
  },
  {
    id: 2,
    firstName: 'Bili',
    type: 'Capybaras',
    accessory: 'Car',
    birthDate: new Date('2020-06-23'),
  },
  {
    id: 3,
    firstName: 'Jojo',
    type: 'Dog',
    accessory: 'Bike',
    birthDate: new Date('2020-06-23'),
  },
  {
    id: 4,
    firstName: 'Macca',
    type: 'Elephant',
    accessory: 'Key',
    birthDate: new Date('2020-06-23'),
  },
  {
    id: 5,
    firstName: 'Fro',
    type: 'Duck',
    accessory: 'Motor',
    birthDate: new Date('2020-06-23'),
  },
];

export function getAnimals() {
  return animals;
}

export function getAnimal(id) {
  return animals.find((animal) => animal.id === id);
}
