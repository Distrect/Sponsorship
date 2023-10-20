import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { Repository } from 'typeorm';
import Child from 'src/database/user/child/child.entity';
import type { DeepPartial } from 'src/shared/types';

@Injectable()
export default class ChildEntityService {
  constructor(@Injector(Child) private childRepository: Repository<Child>) {}

  private async saveChildEntity(entity: Child) {
    return await this.childRepository.save(entity);
  }

  public async createChild(childData: DeepPartial<Child>) {
    const createdChild = this.childRepository.create({ ...childData });
    return await this.saveChildEntity(createdChild);
  }
}
