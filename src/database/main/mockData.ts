import { faker } from '@faker-js/faker';
import { DeepPartial } from 'typeorm';
import { SponsorshipStatus } from 'src/database/sponsor';
import { ActorType, CityEnum, NationalityEnum, Role } from 'src/database/user';
import User from 'src/database/user/user/user.entity';
import Child from 'src/database/user/child/child.entity';
import BaseUser from 'src/database/user/baseUser';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import Identification from 'src/database/user/identification/identification.entity';
import Authority from 'src/database/user/authority/authority.entity';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

type EntityMap = {
  Child: Partial<Child>;
  User: Partial<User>;
  Sponsorship: Partial<Sponsorship>[];
};

const EntityObject: Record<keyof EntityMap, (...args: any[]) => Partial<any>> =
  {
    Child: generateMockChild,
    User: generateMockUser,
    Sponsorship: generateMockSponsorship,
  };

export function generateNeedGroup(childIds: number[]) {
  const needGroups: DeepPartial<NeedGroup>[] = [];

  for (let i = 0; i < childIds.length; i++) {
    const needGroup: DeepPartial<NeedGroup> = {
      child: { userId: childIds[i] },
      explanation: faker.person.jobDescriptor(),
      title: faker.person.jobArea(),
    };
    const needs = generateChildNeed(childIds[i], needGroup, 5);

    needGroup.needs = needs;

    needGroups.push(needGroup);
  }

  return needGroups;
}

function generateChildNeed(
  userId: number,
  group: DeepPartial<NeedGroup>,
  count: number,
): DeepPartial<ChildNeed>[] {
  const childNeeds: DeepPartial<ChildNeed>[] = [];

  if (!count || count < 0) throw new Error('İbnelik yapma!');

  for (let i = 0; i < count; i++) {
    const amount = faker.number.int({ min: 1, max: 4 });
    const childNeed: DeepPartial<ChildNeed> = {
      group,
      amount,
      price: faker.number.float({ min: 50, max: 500, precision: 2 }),
      title: faker.commerce.product(),
      isDeleted: false,
    };

    childNeeds.push(childNeed);
  }

  return childNeeds;
}

function generateMockBaseUser(): Partial<BaseUser> {
  return {
    isDeleted: false,
    // city: faker.helpers.enumValue(CityEnum),
    city: CityEnum.LEFKOŞA,
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

export function generateMockAuthority(): Partial<Authority> {
  return {
    isDeleted: false,
    city: CityEnum.LEFKOŞA,
    email: 'authority@gmai.com',
    name: 'Samet',
    lastname: 'Sarıçiçek',
    password:
      'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg5.zppFNJKR7ELJiwplJQQy_eUU818Oyn71OylXJ9s7EEU',
    dateOfBirth: new Date(2001, 1, 15),
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
  return userIds.map(() => ({
    actorType: ActorType.USER,
    idNumber: faker.string.numeric({ length: 11 }),
    nationality: NationalityEnum.TC,
    path: faker.internet.url(),
  }));
}

export function generateMockSponsorship(
  userIds: number[],
  childIds: number[],
): DeepPartial<Sponsorship>[] {
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
