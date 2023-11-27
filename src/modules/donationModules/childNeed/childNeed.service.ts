import { INeedWithTotal } from '../../../database/donation/entities/childNeed/childNeed.dao';
import { Injectable } from '@nestjs/common';
import { IUserCookie } from 'src/shared/types';
import {
  CreateNeedDTO,
  EditNeed,
  EditNeedDTO,
} from 'src/new modules/donationModules/childNeed/childNeed.dto';
import {
  IsNotActiveGroup,
  ServerError,
  UserNotFoundError,
} from 'src/utils/error';
import ChildNeedDao from 'src/database/donation/entities/childNeed/childNeed.dao';
import ChildNeedGroupDao from 'src/database/donation/entities/childNeedGroup/childNeedGroup.dao';
import ChildDao from 'src/database/user/child/child.dao';
import type SafeService from 'src/new modules/donationModules/safe/safe.service';

@Injectable()
export default class ChildNeedService {
  private childRepository: ChildDao;
  private childNeedDao: ChildNeedDao;
  private needGroupDao: ChildNeedGroupDao;
  private safeService: SafeService;

  private compareNeed(
    originalNeed: INeedWithTotal,
    { price, amount }: EditNeed,
  ) {
    const newPrice = price * amount;

    if (newPrice < originalNeed.totalDonation) {
      const excessMoney = originalNeed.totalDonation - newPrice;

      return excessMoney;
    } else {
      return false;
    }
  }

  public async createNeeds(
    userId: number,
    user: IUserCookie,
    { needs, needExplanation }: CreateNeedDTO,
  ) {
    const child = await this.childRepository.getChild({ userId });

    if (!child) throw new UserNotFoundError('The Child Not Found');

    const createdNeedGroup =
      await this.needGroupDao.createChildNeedGroup(needExplanation);

    const needPromises = needs.map((need) =>
      this.childNeedDao.createNeed(need),
    );

    const createdNeeds = await Promise.all(needPromises)
      .then((res) => res)
      .catch((err) => {
        console.log('Create Need Error', err);
        throw new ServerError();
      });

    createdNeedGroup.needs = createdNeeds;

    return await this.needGroupDao.saveNeedGroupEntity(createdNeedGroup);
  }

  public async editNeed(
    needGroupId: number,
    { editedNeeds }: EditNeedDTO,
    childId: number,
  ) {
    const needMap = new Map<number, EditNeed>();

    const [isActiveGroup, child] = await Promise.all([
      this.needGroupDao.checkIfNeedGroupIsActive(needGroupId),
      this.childRepository.getChild({ userId: childId }),
    ]).then((res) => res);

    if (!isActiveGroup) throw new IsNotActiveGroup();

    const promiseNeeds = editedNeeds.map((needParam) => {
      needMap.set(needParam.needId, needParam);
      return this.childNeedDao.getNeedsWithTotalDonation(needParam.needId);
    });

    const needs = await Promise.all(promiseNeeds).then((res) => res);

    const promiseUpdateNeeds = [];

    for (const need of needs) {
      const updatedNeed = needMap.get(need.needId);

      if (!updatedNeed) throw new ServerError();

      if (!updatedNeed.price && !updatedNeed.amount) continue;

      const restMoney = this.compareNeed(need, updatedNeed);

      if (typeof restMoney === 'number') {
        await this.safeService.depositMoneyToChild(
          need.needId,
          child.userId,
          restMoney,
        );
      }

      promiseUpdateNeeds.push(this.childNeedDao.updateNeed(updatedNeed));
    }

    const updateResults = await Promise.all(promiseNeeds).then((res) => res);

    return updateResults;
  }

  public async deleteNeed(needId: number, childId: number) {
    const [need, child] = await Promise.all([
      this.childNeedDao.getNeedsWithTotalDonation(needId),
      this.childRepository.getChild({ userId: childId }),
    ]);

    await this.childNeedDao.deleteNeed(need.needId);

    await this.safeService.depositMoneyToChild(
      need.needId,
      child.userId,
      need.totalDonation,
    );

    return need;
  }
}
