import { Injectable } from '@nestjs/common';
import { INeedWithTotal } from 'src/database/donation/childNeed/childNeed.dao.interface';
import { NeedGroupWithNeedsWithTotalDonation } from 'src/database/donation/needGroup/needGroup.dao.interface';
import { IUserCookie } from 'src/shared/types';
import {
  CreateNeedDTO,
  EditNeed,
  DonationHistoryParams,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';
import Donation from 'src/database/donation/donation/donation.entity';

@Injectable()
export default class NeedManagementRouteService {
  constructor(private childNeedService: ChildNeedService) {}

  public async createNeeds(
    childId: number,
    authority: IUserCookie,
    body: CreateNeedDTO,
  ): Promise<NeedGroupWithNeedsWithTotalDonation> {
    return await this.childNeedService.createNeeds(childId, authority, body);
  }
  public async editNeed(
    needGroupId: number,
    editedNeeds: EditNeed[],
    childId: number,
  ): Promise<INeedWithTotal[]> {
    return await this.childNeedService.editNeed(
      needGroupId,
      editedNeeds,
      childId,
    );
  }
  public async deleteNeed(
    needId: number,
    childId: number,
  ): Promise<INeedWithTotal> {
    return await this.childNeedService.deleteNeed(needId, childId);
  }
  public async donationHistory(
    userId: number,
    page: number,
    donationHistoryParams: DonationHistoryParams,
  ): Promise<Donation[]> {
    return await this.childNeedService.donationHistory(
      userId,
      page,
      donationHistoryParams,
    );
  }

  public async getChildNeedsData(authority: IUserCookie, childId: number) {
    return await this.childNeedService.getChildNeedsData(authority, childId);
  }
}
