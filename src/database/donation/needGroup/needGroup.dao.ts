import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import {
  HasActiveNeedGroupError,
  NotFound,
  ServerError,
} from 'src/utils/error';
import { ChildNeedGroupStatus } from 'src/database/donation';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import ChildDao from 'src/database/user/child/child.dao';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import { NeedGroupWithNeedsWithTotalDonation } from 'src/database/donation/needGroup/needGroup.dao.interface';
ChildNeedGroup;

@Injectable()
export default class NeedGroupDao {
  constructor(
    @Injector(ChildNeedGroup)
    private childNeedGroupRepository: Repository<ChildNeedGroup>,
    private childDao: ChildDao,
    private childNeedDao: ChildNeedDao,
  ) {}

  public async saveNeedGroupEntity(entity: ChildNeedGroup) {
    return await this.childNeedGroupRepository.save(entity);
  }

  public async getActiveNeedGroupWithNeeds(
    childId: number,
  ): Promise<NeedGroupWithNeedsWithTotalDonation> {
    const child = await this.childDao.getChild({ userId: childId });
    const activeNeedGroup = (await this.getActiveNeedGroups(
      child.userId,
    )) as NeedGroupWithNeedsWithTotalDonation;

    const promiseChildNeeds = activeNeedGroup.needs.map(({ needId }) =>
      this.childNeedDao.getNeedWithTotalDonation(needId),
    );

    const childNeeds = await Promise.all([...promiseChildNeeds]).then(
      (res) => res,
    );

    activeNeedGroup.needs = childNeeds;
    activeNeedGroup.child = child;

    return activeNeedGroup;
  }

  public async getActiveNeedGroups(userId: number) {
    const child = await this.childDao.getChild({ userId });

    const activeGroups = await this.childNeedGroupRepository.find({
      where: { status: ChildNeedGroupStatus.OPEN, child: { userId } },
      select: { needs: { needId: true } },
    });

    if (activeGroups.length > 1)
      throw new ServerError('Active needs should not be more than one.');

    return activeGroups[0];
  }

  public async createChildNeedGroup(
    userId: number,
    explanation: string,
    active: ChildNeedGroupStatus = ChildNeedGroupStatus.OPEN,
  ) {
    const child = await this.childDao.getChild({ userId });

    const activeNeeds = await this.getActiveNeedGroups(child.userId);

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
