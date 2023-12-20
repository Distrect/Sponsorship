import { DataSource } from 'typeorm';
import { faker } from '@faker-js/faker';
import { ActorType, CityEnum, NationalityEnum, Role } from 'src/database/user';
import { IOptions, Multiplier } from 'src/database/main/mockData.interface';
import Child from 'src/database/user/child/child.entity';
import {
  EntitiyMapType,
  TypeofEntityMap,
} from 'src/database/main/main.database.interface';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import Safe from 'src/database/donation/safe/safe.entity';
import User from 'src/database/user/user/user.entity';
import BaseUser from 'src/database/user/baseUser';
import Authority from 'src/database/user/authority/authority.entity';
import Identification from 'src/database/user/identification/identification.entity';

interface IMockDataGenerator {
  multiplier: Multiplier;
}

export default class MockDataGenerator implements IMockDataGenerator {
  EntityObject: EntitiyMapType<keyof TypeofEntityMap> = {
    Child: this.generateMockUser,
    User: this.generateMockUser,
    ChildNeed: function (): ChildNeed {
      throw new Error('Function not implemented.');
    },
    NeedGroup: function (): NeedGroup {
      throw new Error('Function not implemented.');
    },
    NeedSafe: function (): NeedSafe {
      throw new Error('Function not implemented.');
    },
    Safe: function (): Safe {
      throw new Error('Function not implemented.');
    },
    FixNeed: function ():
      | ChildNeed
      | NeedGroup
      | NeedSafe
      | FixNeed
      | Sponsorship
      | Authority
      | BaseUser
      | Child
      | User
      | UserRequest {
      throw new Error('Function not implemented.');
    },
    Sponsorship: function ():
      | ChildNeed
      | NeedGroup
      | NeedSafe
      | FixNeed
      | Sponsorship
      | Authority
      | BaseUser
      | Child
      | User
      | UserRequest {
      throw new Error('Function not implemented.');
    },
    Authority: function ():
      | ChildNeed
      | NeedGroup
      | NeedSafe
      | FixNeed
      | Sponsorship
      | Authority
      | BaseUser
      | Child
      | User
      | UserRequest {
      throw new Error('Function not implemented.');
    },
    BaseUser: function ():
      | ChildNeed
      | NeedGroup
      | NeedSafe
      | FixNeed
      | Sponsorship
      | Authority
      | BaseUser
      | Child
      | User
      | UserRequest {
      throw new Error('Function not implemented.');
    },
    UserRequest: function ():
      | ChildNeed
      | NeedGroup
      | NeedSafe
      | FixNeed
      | Sponsorship
      | Authority
      | BaseUser
      | Child
      | User
      | UserRequest {
      throw new Error('Function not implemented.');
    },
    Identification: this.generateMockIdentification,
  };

  constructor(private dataSource: DataSource) {}

  private countChecker(count: number) {
    if (count <= 0) throw new Error('Thats the wrong Number');

    return count;
  }

  public generator<T extends keyof TypeofEntityMap>(
    count: number,
    Entity: T,
  ): Array<TypeofEntityMap[T]> {
    this.countChecker(count);
    const method = () => this.EntityObject[Entity]();

    const multiplied = this.multiplier(method, { count });

    return multiplied as unknown as Array<TypeofEntityMap[T]>;
  }

  public multiplier<Entity>(
    method: (...args: any[]) => Entity,
    options: IOptions,
    param?: any,
  ): Entity[] {
    return faker.helpers.multiple((...param: any[]) => method(param), options);
  }

  public generateMockChild(): Child {
    return this.dataSource.manager.create(Child, {
      ...this.generateMockBaseUser(),
      role: Role.Child,
      story: faker.person.bio(),
      dateOfBirth: faker.date.birthdate(),
    });
  }

  public generateMockBaseUser(): Partial<BaseUser> {
    return {
      isDeleted: false,
      city: CityEnum.LEFKOŞA,
      email: faker.internet.email(),
      name: faker.person.firstName(),
      lastname: faker.person.lastName(),
      password: faker.internet.password(),
      // city: faker.helpers.enumValue(CityEnum),
    };
  }

  public generateMockUser(): User {
    const mockBaseUser = this.generateMockBaseUser();

    return this.dataSource.manager.create(User, {
      ...mockBaseUser,
      role: Role.User,
      canLogin: true,
      dateOfBirth: faker.date.birthdate(),
    });
  }

  public generateMockAuthority(): Authority {
    return this.dataSource.manager.create(Authority, {
      isDeleted: false,
      city: CityEnum.LEFKOŞA,
      email: 'authority@gmai.com',
      name: 'Samet',
      lastname: 'Sarıçiçek',
      password:
        'eyJhbGciOiJIUzI1NiJ9.MTIzNDU2Nzg5.zppFNJKR7ELJiwplJQQy_eUU818Oyn71OylXJ9s7EEU',
      dateOfBirth: new Date(2001, 1, 15),
    });
  }

  public generateMockIdentification(): Identification {
    return this.dataSource.manager.create(Identification, {
      actorType: ActorType.USER,
      idNumber: faker.string.numeric({ length: 10 }),
      nationality: NationalityEnum.KKTC,
    });
  }

  public generateChildNeed(): ChildNeed {
    return this.dataSource.manager.create(ChildNeed, {
      amount: faker.number.int({ min: 50, max: 650 }),
      title: faker.person.zodiacSign(),
      price: faker.number.float({ min: 50, max: 500, precision: 2 }),
      isDeleted: false,
    });
  }

  public generateNeedGroup() {
    return this.dataSource.manager.create(NeedGroup, {
      explanation: faker.person.jobDescriptor(),
      title: faker.person.jobArea(),
    });
  }
}
