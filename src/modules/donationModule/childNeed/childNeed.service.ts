import { Injectable } from '@nestjs/common';
import { IUserCookie } from 'src/shared/types';
import { INeedWithTotal } from 'src/database/donation/childNeed/childNeed.DAO.interface';
import { ServerError, IsNotActiveGroup } from 'src/utils/error';
import {
  EditNeed,
  CreateNeedDTO,
  DonationHistoryParams,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import ChildDAO from 'src/database/user/child/child.DAO';
import DonationDAO from 'src/database/donation/donation/donation.DAO';
import ChildNeedDAO from 'src/database/donation/childNeed/childNeed.DAO';
import NeedGroupDAO from 'src/database/donation/needGroup/needGroup.DAO';
import SafeDAO from 'src/database/donation/safe/safe.DAO';

@Injectable()
export default class ChildNeedService {
  constructor(
    private childDAO: ChildDAO,
    private childNeedDAO: ChildNeedDAO,
    private needGroupDAO: NeedGroupDAO,
    private donationDAO: DonationDAO,
    private safeDAO: SafeDAO,
  ) {}

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
    { needs }: CreateNeedDTO,
  ) {
    const child = await this.childDAO.getChild({ userId: childId });

    const createdNeedGroup =
      await this.needGroupDAO.getActiveGroupOfChild(childId);

    const needPromises = needs.map((need) =>
      this.childNeedDAO.createNeed(need),
    );

    console.log('LFŞSDLŞFGLDSŞİLFŞİDSF', createdNeedGroup);

    const createdNeeds = await Promise.all(needPromises)
      .then((res) => res)
      .catch((err) => {
        console.log('Create Need Error', err);
        throw new ServerError();
      });

    createdNeedGroup.needs = [...createdNeeds];

    await this.needGroupDAO.saveNeedGroupEntity(createdNeedGroup);

    const needGroupWithNeedWithTotalDonation =
      await this.needGroupDAO.getActiveNeedGroupWithNeeds(child.userId);

    return needGroupWithNeedWithTotalDonation;
  }

  public async editNeed(
    needGroupId: number,
    editedNeeds: EditNeed[],
    childId: number,
  ) {
    const needMap = new Map<number, EditNeed>();

    const [activeNeedGroup, child] = await Promise.all([
      this.needGroupDAO.getActiveNeedGroups(needGroupId),
      this.childDAO.getChild({ userId: childId }),
    ]).then((res) => res);

    if (!activeNeedGroup) throw new IsNotActiveGroup();

    const promiseNeeds = editedNeeds.map((needParam) => {
      needMap.set(needParam.needId, needParam);
      return this.childNeedDAO.getNeedWithTotalDonation(needParam.needId);
    });

    const needs = await Promise.all(promiseNeeds).then((res) => res);

    const promiseUpdateNeeds = [];

    for (const need of needs) {
      const updatedNeed = needMap.get(need.needId);

      if (!updatedNeed) throw new ServerError();

      if (!updatedNeed.price && !updatedNeed.amount) {
        promiseUpdateNeeds.push(this.childNeedDAO.updateNeed(updatedNeed));
        continue;
      }

      const restMoney = this.compareNeed(need, updatedNeed);

      if (!restMoney) {
        promiseUpdateNeeds.push(this.childNeedDAO.updateNeed(updatedNeed));
        continue;
      }

      /* await this.safeDAO.depositMoneyToChild(
        need.needId,
        child.userId,
        restMoney,
      );*/

      promiseUpdateNeeds.push(this.childNeedDAO.updateNeed(updatedNeed));
    }

    const updateResults = await Promise.all(promiseNeeds).then((res) => res);

    return updateResults;
  }

  public async deleteNeed(needId: number, childId: number) {
    const [need, child] = await Promise.all([
      this.childNeedDAO.getNeedWithTotalDonation(needId),
      this.childDAO.getChild({ userId: childId }),
    ]);

    await this.childNeedDAO.deleteNeed(need.needId);
    /*
    await this.safeService.depositMoneyToChild(
      need.needId,
      child.userId,
      need.totalDonation,
    );*/

    return need;
  }

  public async getChildNeedsData(authority: IUserCookie, childId: number) {
    console.log('THİS', this.childNeedDAO);

    const needData =
      await this.needGroupDAO.getActiveNeedGroupWithNeeds(childId);

    console.log('1', needData);

    return needData;
  }

  public async listSponsorableNeeds() {}

  public async donationHistory(
    userId: number,
    page: number,
    donationHistoryParams: DonationHistoryParams,
  ) {
    const donationHistory = await this.donationDAO.getDonationHistory(
      userId,
      donationHistoryParams,
      page,
    );

    return donationHistory;
  }
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

    return await this.childNeedDAO.listNeedsWithChild(
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
        await this.childNeedDAO.getNeedWithTotalDonation(needId);

      const leftAmount =
        needWithTotal.amount * needWithTotal.price -
        needWithTotal.totalDonation;

      if (leftAmount < cost) {
        throw new Error('Kral bunu halletmen gerek'); // left amount kasaya atılab,lir
      }

      donationPromises.push(
        this.donationDAO.createDonation(
          user.userId,
          needId,
          cost //Burayı leftAMount ile değiştir ,
        ),
      );
    }

    return await Promise.all(donationPromises);
  }
*/
