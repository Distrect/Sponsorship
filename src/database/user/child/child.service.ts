import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import Child from 'src/database/user/child/child.entity';
import type { DeepPartial } from 'src/shared/types';
import { UserNotFoundError } from 'src/utils/error';

@Injectable()
export default class ChildEntityService {
  constructor(@Injector(Child) private childRepository: Repository<Child>) {}

  private async saveChildEntity(
    entity: Child,
    updateChildData?: DeepPartial<Child>,
  ): Promise<Child> {
    return await this.childRepository.save(
      updateChildData ? { ...entity, ...updateChildData } : entity,
    );
  }

  public async getChild(childAttributes: FindOptionsWhere<Child>) {
    return await this.childRepository.findOne({
      where: { ...childAttributes },
    });
  }

  public async createChild(childData: DeepPartial<Child>) {
    const createdChild = this.childRepository.create({ ...childData });
    return await this.saveChildEntity(createdChild);
  }

  public async deleteChild(userId: number) {
    const child = await this.getChild({ userId });

    if (!child) throw new UserNotFoundError('The Child is Not Found');

    child.isDeleted = true;

    return await this.saveChildEntity(child);
  }

  public async updateChild(userId: number, body: DeepPartial<Child>) {
    const child = await this.getChild({ userId });

    if (!child) throw new UserNotFoundError('The Child is Not Found');

    return await this.saveChildEntity(child, body);
  }

  public async listChilds() {
    const result = this.childRepository
      .createQueryBuilder('child')
      .select(['name', 'lastname', 'city']);
  }
}
