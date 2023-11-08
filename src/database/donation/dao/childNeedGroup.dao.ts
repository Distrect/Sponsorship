import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import {
  HasActiveNeedGroupError,
  NotFound,
  ServerError,
} from 'src/utils/error';
import { ChildNeedGroupStatus } from 'src/database/donation';
import ChildNeedGroup from 'src/database/donation/entities/childNeedGroup.entity';

@Injectable()
export default class ChildNeedGroupDao {
  @Injector(ChildNeedGroup)
  private childNeedGroupRepository: Repository<ChildNeedGroup>;

  public async saveNeedGroupEntity(entity: ChildNeedGroup) {
    return await this.childNeedGroupRepository.save(entity);
  }

  public async getActiveNeedGroups() {
    const activeGroups = await this.childNeedGroupRepository.find({
      where: { status: ChildNeedGroupStatus.OPEN },
    });

    if (activeGroups.length > 1)
      throw new ServerError('Active needs should not be more than one.');

    return activeGroups[0];
  }

  public async createChildNeedGroup(
    explanation: string,
    active: ChildNeedGroupStatus = ChildNeedGroupStatus.OPEN,
  ) {
    const activeNeeds = await this.getActiveNeedGroups();

    if (activeNeeds) throw new HasActiveNeedGroupError();

    const needGroupInstance = this.childNeedGroupRepository.create({
      explanation,
      status: active,
    });

    return await this.saveNeedGroupEntity(needGroupInstance);
  }

  public async checkIfNeedGroupIsActive(needGroupId: number) {
    const needGroup = await this.childNeedGroupRepository.findOne({
      where: { needGroupId },
    });

    if (!needGroup) throw new NotFound();

    return needGroup.status === ChildNeedGroupStatus.OPEN;
  }
}
