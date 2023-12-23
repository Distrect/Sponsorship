import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Repository } from 'typeorm';
import { NotFound, UserNotFoundError } from 'src/utils/error';
import { Role } from 'src/database/user';
import type { DeepPartial } from 'typeorm';
import {
  ChildWhere,
  DeepPartialChild,
  IListedChild,
} from 'src/database/user/child/child.DAO.interface';
import {
  IFilterChilds,
  ISortChilds,
} from 'src/modules/userModule/childModule/child.module.interface';
import { IPaginationData } from 'src/shared/types';
import Child from 'src/database/user/child/child.entity';

@Injectable()
export default class ChildDAO {
  constructor(@Injector(Child) private childRepository: Repository<Child>) {}

  private async updateChildEntity(
    entity: Child,
    updatedChildData: DeepPartial<Child>,
  ) {
    if (!entity.userId) throw Error('Entity id is not provided');

    return (await this.childRepository.save(
      {
        ...entity,
        ...updatedChildData,
        userId: entity.userId,
      },
      { reload: true },
    )) as Child;
  }

  private async saveChildEntity(entity: Child) {
    return await this.childRepository.save(entity);
  }

  public async getChild(childAttributes: ChildWhere) {
    const child = await this.childRepository.findOne({
      where: { ...childAttributes },
      relations: { safe: true },
    });

    if (!child) throw new NotFound('Child is not Found');

    return child;
  }

  public async createChild(childData: DeepPartialChild) {
    const createdChild = this.childRepository.create({
      ...childData,
      role: Role.Child,
    });
    return await this.saveChildEntity(createdChild);
  }

  public async deleteChild(userId: number) {
    const child = await this.getChild({ userId });

    if (!child) throw new UserNotFoundError('The Child is Not Found');

    child.isDeleted = true;

    return await this.saveChildEntity(child);
  }

  public async updateChild(userId: number, body: DeepPartialChild) {
    const child = await this.getChild({ userId });

    if (!child) throw new UserNotFoundError('The Child is Not Found');

    return await this.updateChildEntity(child, body);
  }

  public async listChilds(
    { age, idNumber, lastname, name }: IFilterChilds = {},
    sort: ISortChilds = {},
    page: number = 0,
  ): Promise<IPaginationData<IListedChild>> {
    console.log`Page:${page},name:${name}`;
    let querry = this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.identifications', 'identification')
      .select([
        'child.name as name',
        'child.lastname as lastname',
        'child.city as city',
        'FLOOR(DATEDIFF(child.dateOfBirth,NOW()) / 365)  AS age',
        'identification.idNumber as idNumber',
      ])
      .offset(page * 10)
      .limit(10);

    if (name) {
      querry = querry.andWhere('name like :name', {
        name: '%' + name + '%',
      });
    }

    if (lastname) {
      querry = querry.andWhere('child.lastname like :lastname', {
        lastname: '%' + lastname + '%',
      });
    }

    if (age) {
      querry = querry.andWhere('age = :age', { age });
    }

    if (idNumber) {
      querry = querry = querry.andWhere('idNumber like :idNumber', {
        idNumber,
      });
    }

    if (sort.sortBy) {
      querry = querry.orderBy(sort.sortBy, sort.way || 'ASC');
    }

    const [count, result] = await Promise.all([
      querry.getCount(),
      querry.getRawMany(),
    ]);

    return { count, result };
  }

  public async getChildCard(childId: number) {
    const child = await this.getChild({ userId: childId });

    return child;
  }

  public async getChildsOfSponosredUser(userId: number) {
    const query = this.childRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.fixNeeds', 'fix_need')
      .leftJoinAndSelect('fix_need.sponsorship', 'sponsorship')
      .where('sponsorship.user = :userId', { userId });

    const childs = await query.getMany();

    return childs;
  }
}
