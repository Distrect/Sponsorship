import Child from 'src/database/user/child/child.entity';
import SponsorShip from 'src/database/sponsor/sponsor/sponsorShip.entity';
import { faker } from '@faker-js/faker';
import { ActorType, CityEnum, NationalityEnum, Role } from 'src/database/user';
import User from 'src/database/user/user.entity';
import BaseUser from 'src/database/user/baseUser';
import { SponsorshipStatus } from 'src/database/sponsor';
import { DeepPartial } from 'typeorm';
import Identification from 'src/database/user/identification/identification.entity';

type EntityMap = {
  Child: Partial<Child>;
  User: Partial<User>;
  SponsorShip: Partial<SponsorShip>[];
};

const EntityObject: Record<keyof EntityMap, (...args: any[]) => Partial<any>> =
  {
    Child: generateMockChild,
    User: generateMockUser,
    SponsorShip: generateMockSponsorship,
  };

function generateMockBaseUser(): Partial<BaseUser> {
  return {
    isDeleted: false,
    city: faker.helpers.enumValue(CityEnum),
    email: faker.internet.email(),
    name: faker.person.firstName(),
    lastname: faker.person.lastName(),
    password: faker.internet.password(),
  };
}

function generateMockUser(): Partial<User> {
  const mockBaseUser = generateMockBaseUser();
  return {
    ...mockBaseUser,
    role: Role.User,
    canLogin: true,
    dateOfBirth: faker.date.birthdate(),
  };
}

function generateMockChild(): Partial<Child> {
  const mockBaseUser = generateMockBaseUser();
  return {
    ...mockBaseUser,
    role: Role.Child,
    story: faker.person.bio(),
    dateOfBirth: faker.date.birthdate(),
  };
}

export function generateMockIdentification(
  userIds: number[],
): Partial<Identification>[] {
  return userIds.map((userId) => ({
    actorType: ActorType.USER,
    idNumber: faker.string.numeric({ length: 11 }),
    nationality: NationalityEnum.TC,
    path: faker.internet.url(),
  }));
}

export function generateMockSponsorship(
  userIds: number[],
  childIds: number[],
): DeepPartial<SponsorShip>[] {
  if (childIds.length === 0) throw new Error('Not Possible');

  return childIds
    .map((childId) => {
      return userIds.map((userId) => ({
        child: { userId: childId },
        user: { userId },
        status: faker.helpers.enumValue(SponsorshipStatus),
      }));
    })
    .flat();
}

export const generateMockData = <T extends keyof EntityMap>(
  count: number,
  entityName: T,
): Array<EntityMap[T]> => {
  if (count < 0) throw new Error('Bro Count cannot be lower than 1');

  const generatorFunction = EntityObject[entityName] as () => EntityMap[T];

  return faker.helpers.multiple(generatorFunction, { count });
};
