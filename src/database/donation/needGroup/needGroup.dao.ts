import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Injector } from 'src/database/utils/repositoryProvider';
import {
  HasActiveNeedGroupError,
  NotFound,
  ServerError,
} from 'src/utils/error';
import {
  DeepPartialNeedGroup,
  NeedGroupWithNeedsWithTotalDonation,
} from 'src/database/donation/needGroup/needGroup.DAO.interface';
import { ChildNeedGroupStatus } from 'src/database/donation';
import ChildDAO from 'src/database/user/child/child.DAO';
import ChildNeedDAO from 'src/database/donation/childNeed/childNeed.DAO';

import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';

@Injectable()
export default class NeedGroupDAO {
  constructor(
    @Injector(NeedGroup)
    private needGroupRepository: Repository<NeedGroup>,
    private childDAO: ChildDAO,
    private childNeedDAO: ChildNeedDAO,
  ) {}

  public async saveNeedGroupEntity(entity: NeedGroup) {
    return await this.needGroupRepository.save(entity);
  }
  private async getActiveOrCreate(childId: number) {
    try {
      const activeGroup = await this.getActiveGroupOfChild(childId);
    } catch (error) {
      const newActiveGroup = await this.createChildNeedGroup(childId, {
        explanation: 'Untitled',
        title: 'Untitle',
      });
    }
  }
  public async getActiveGroupOfChild(childId: number) {
    const activeGroups = await this.needGroupRepository.find({
      where: { status: ChildNeedGroupStatus.OPEN, child: { userId: childId } },
    });

    console.log('Active groups', activeGroups);

    if (activeGroups.length > 1) throw new HasActiveNeedGroupError();

    return activeGroups[0];
  }

  public async getActiveNeedGroupWithNeeds(
    childId: number,
  ): Promise<NeedGroupWithNeedsWithTotalDonation> {
    const activeNeedGroup = (await this.getActiveNeedGroups(
      childId,
    )) as NeedGroupWithNeedsWithTotalDonation;

    console.log('Active Need Groups', activeNeedGroup);

    const promiseChildNeeds = activeNeedGroup.needs.map(({ needId }) =>
      this.childNeedDAO.getNeedWithTotalDonation(needId),
    );

    const childNeeds = await Promise.all([...promiseChildNeeds]).then(
      (res) => res,
    );

    activeNeedGroup.needs = childNeeds;

    return activeNeedGroup;
  }

  public async getActiveNeedGroups(userId: number) {
    const child = await this.childDAO.getChild({ userId });

    const activeGroups = await this.needGroupRepository
      .createQueryBuilder('need_group')
      .leftJoinAndSelect('need_group.needs', 'child_need')
      .leftJoin('need_group.child', 'child')
      .where('child.userId = :userId', { userId })
      .andWhere('need_group.status = :status', {
        status: ChildNeedGroupStatus.OPEN,
      })
      .getMany();
    /*
    const activeGroups = await this.needGroupRepository.find({
      where: { status: ChildNeedGroupStatus.OPEN, child: { userId } },
      select: { needs: true },
    });
*/
    if (activeGroups.length > 1 || !activeGroups.every((group) => !!group))
      throw new ServerError('Active needs should not be more than one.');

    return activeGroups[0];
  }

  public async createChildNeedGroup(
    userId: number,
    needGroupParams?: DeepPartialNeedGroup,
  ) {
    const child = await this.childDAO.getChild({ userId });

    const activeNeeds = await this.getActiveNeedGroups(child.userId);

    if (activeNeeds) throw new HasActiveNeedGroupError();

    const needGroupInstance = this.needGroupRepository.create({
      ...needGroupParams,
      child: { userId },
    });

    return await this.saveNeedGroupEntity(needGroupInstance);
  }

  public async checkIfNeedGroupIsActive(needGroupId: number) {
    const needGroup = await this.needGroupRepository.findOne({
      where: { needGroupId },
    });

    if (!needGroup) throw new NotFound();

    return needGroup.status === ChildNeedGroupStatus.OPEN;
  }
}
