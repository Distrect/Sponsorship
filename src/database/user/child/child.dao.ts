import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ChildPagination } from 'src/old.dto';
import { NotFound, UserNotFoundError } from 'src/utils/error';
import { CityEnum, Role } from 'src/database/user';
import Child from 'src/database/user/child/child.entity';
import type { DeepPartial } from 'typeorm';
import {
  ChildWhere,
  DeepPartialChild,
} from 'src/database/user/child/child.dao.interface';

export interface IChildListMethod {
  childs: IChildList[];
  count: number;
}

interface IChildList {
  name: string;
  lastname: string;
  city: CityEnum;
  age: number;
  count: number;
}

@Injectable()
export default class ChildDao {
  constructor(@Injector(Child) private childRepository: Repository<Child>) {}

  private async promiseAll(...args: Promise<any>[]) {
    return await Promise.all(args);
  }

  private async updateChildEntity(
    entity: Child,
    updatedChildData: DeepPartial<Child>,
  ) {
    return await this.childRepository.save(
      {
        ...entity,
        ...updatedChildData,
        userId: entity.userId,
      },
      { reload: true },
    );
  }

  private async saveChildEntity(entity: Child) {
    return await this.childRepository.save(entity);
  }

  public async getChild(childAttributes: ChildWhere) {
    const child = await this.childRepository.findOne({
      where: { ...childAttributes },
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

  /*Buna Kesinlikel el at El At*/
  public async listChilds({
    // age,
    fullNameLike,
    page,
    resultsPerPage,
  }: ChildPagination): Promise<IChildListMethod> {
    let querry = this.childRepository
      .createQueryBuilder('child')
      .select([
        'child.name',
        'child.lastname',
        'child.city',
        'FLOOR(DATEDIFF(child.birthDate,NOW()) / 365)  AS age',
      ]);

    const totalChildCount = querry.getCount();

    querry = querry
      .skip(page * resultsPerPage || page * 10)
      .take(resultsPerPage);

    if (fullNameLike) {
      querry = querry.where('child.fullName like :fullNameLike', {
        fullNameLike: `%${fullNameLike}%`,
      });
    }

    return await this.promiseAll(querry.getRawMany(), totalChildCount).then(
      ([childs, count]) => ({ childs, count }),
    );
  }
}
