import { Injectable } from '@nestjs/common';
import { IUserCookie } from 'src/shared/types';
import { INeedWithTotal } from 'src/database/donation/childNeed/childNeed.dao.interface';
import { ServerError, IsNotActiveGroup } from 'src/utils/error';
import {
  EditNeed,
  CreateNeedDTO,
  DonationHistoryParams,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import ChildDao from 'src/database/user/child/child.dao';
import DonationDao from 'src/database/donation/donation/donation.dao';
import SafeService from 'src/modules/donationModule/safe/safe.service';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import NeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';

@Injectable()
export default class ChildNeedService {
  private childRepository: ChildDao;
  private childNeedDao: ChildNeedDao;
  private needGroupDao: NeedGroupDao;
  private donationDao: DonationDao;
  private safeService: SafeService;

  private compareNeed(
    { totalDonation }: INeedWithTotal,
    { price, amount }: EditNeed,
  ) {
    const newPrice = price * amount;

    if (newPrice < totalDonation) {
      const excessMoney = totalDonation - newPrice;

      return excessMoney;
    } else {
      return 0;
    }
  }

  public async createNeeds(
    childId: number,
    authority: IUserCookie,
    { needs, needExplanation, title }: CreateNeedDTO,
  ) {
    const child = await this.childRepository.getChild({ userId: childId });

    const createdNeedGroup = await this.needGroupDao.createChildNeedGroup(
      childId,
      { explanation: needExplanation, title },
    );

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

    await this.needGroupDao.saveNeedGroupEntity(createdNeedGroup);

    const needGroupWithNeedWithTotalDonation =
      await this.needGroupDao.getActiveNeedGroupWithNeeds(child.userId);

    return needGroupWithNeedWithTotalDonation;
  }

  public async editNeed(
    needGroupId: number,
    editedNeeds: EditNeed[],
    childId: number,
  ) {
    const needMap = new Map<number, EditNeed>();

    const [activeNeedGroup, child] = await Promise.all([
      this.needGroupDao.getActiveNeedGroups(needGroupId),
      this.childRepository.getChild({ userId: childId }),
    ]).then((res) => res);

    if (!activeNeedGroup) throw new IsNotActiveGroup();

    const promiseNeeds = editedNeeds.map((needParam) => {
      needMap.set(needParam.needId, needParam);
      return this.childNeedDao.getNeedWithTotalDonation(needParam.needId);
    });

    const needs = await Promise.all(promiseNeeds).then((res) => res);

    const promiseUpdateNeeds = [];

    for (const need of needs) {
      const updatedNeed = needMap.get(need.needId);

      if (!updatedNeed) throw new ServerError();

      if (!updatedNeed.price && !updatedNeed.amount) {
        promiseUpdateNeeds.push(this.childNeedDao.updateNeed(updatedNeed));
        continue;
      }

      const restMoney = this.compareNeed(need, updatedNeed);

      if (!restMoney) {
        promiseUpdateNeeds.push(this.childNeedDao.updateNeed(updatedNeed));
        continue;
      }

      await this.safeService.depositMoneyToChild(
        need.needId,
        child.userId,
        restMoney,
      );

      promiseUpdateNeeds.push(this.childNeedDao.updateNeed(updatedNeed));
    }

    const updateResults = await Promise.all(promiseNeeds).then((res) => res);

    return updateResults;
  }

  public async deleteNeed(needId: number, childId: number) {
    const [need, child] = await Promise.all([
      this.childNeedDao.getNeedWithTotalDonation(needId),
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

  public async getChildNeedsData(authority: IUserCookie, childId: number) {
    const needData =
      await this.needGroupDao.getActiveNeedGroupWithNeeds(childId);

    return needData;
  }
  /*
  public async listChildWithNeeds(
    user: IUserCookie,
    page: number,
    filterParams: ListChildWithNeeds,
  ) {
    if (user.role !== Role.User)
      throw new ServerError('Aga Sadece Kullanıcılar filtereleyebilecek');

    if (page < 0) throw new ServerError();

    return await this.childNeedDao.listNeedsWithChild(
      user.userId,
      filterParams,
    );
  }

  public async donateToTheChildNeeds(
    user: IUserCookie,
    { needs, childId }: DonateToChild,
  ) {
    const donationPromises: Promise<Donation>[] = [];

    for (const { needId, cost } of needs) {
      const needWithTotal =
        await this.childNeedDao.getNeedWithTotalDonation(needId);

      const leftAmount =
        needWithTotal.amount * needWithTotal.price -
        needWithTotal.totalDonation;

      if (leftAmount < cost) {
        throw new Error('Kral bunu halletmen gerek'); // left amount kasaya atılab,lir
      }

      donationPromises.push(
        this.donationDao.createDonation(
          user.userId,
          needId,
          cost //Burayı leftAMount ile değiştir ,
        ),
      );
    }

    return await Promise.all(donationPromises);
  }
*/

  public async donationHistory(
    userId: number,
    page: number,
    donationHistoryParams: DonationHistoryParams,
  ) {
    const donationHistory = await this.donationDao.getDonationHistory(
      userId,
      donationHistoryParams,
      page,
    );

    return donationHistory;
  }
}
