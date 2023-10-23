import { faker } from '@faker-js/faker';
import { CityEnum, Role } from 'src/database/user';
import type Child from 'src/database/user/child/child.entity';

export const generateMockChild = (count: number): Partial<Child>[] => {
  const mockChild = () => ({
    city: faker.helpers.enumValue(CityEnum),
    dateOfBirth: faker.date.birthdate(),
    email: faker.internet.email(),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    password: faker.internet.password(),
    role: Role.Child,
    story: faker.person.bio(),
  });

  return faker.helpers.multiple(mockChild, { count });
};
