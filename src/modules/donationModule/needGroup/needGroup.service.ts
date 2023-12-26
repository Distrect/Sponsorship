import { Injectable } from '@nestjs/common';
import { IFilterNeedGroup } from 'src/database/donation/needGroup/needGroup.DAO.interface';
import { IDonateChildNeedDTO } from 'src/routes/userRoutes/childInNeed/childInNeed.interface';
import { IUserCookie } from 'src/shared/types';
import { BadRequestError, ServerError } from 'src/utils/error';
import NeedGroupDAO from 'src/database/donation/needGroup/needGroup.DAO';
import ChildNeedDAO from 'src/database/donation/childNeed/childNeed.DAO';
import Donation from 'src/database/donation/donation/donation.entity';
import DonationDAO from 'src/database/donation/donation/donation.DAO';

@Injectable()
export default class NeedGroupService {
  constructor(
    private needGroupDAO: NeedGroupDAO,
    private childNeedDAO: ChildNeedDAO,
    private donationDAO: DonationDAO,
  ) {}

  public async listChildwtihNeeds(filters: IFilterNeedGroup, page: number) {
    const result = await this.needGroupDAO.listSponsorableNeeds(filters, page);

    return result;
  }

  public async donateToNeeds(
    user: IUserCookie,
    requestBody: IDonateChildNeedDTO,
  ) {
    console.log(
      'Vay',
      requestBody,
      Object.keys(requestBody.donatedNeeds).map(([key]) => parseInt(key)),
    );

    try {
      const isCorrectIds =
        await this.needGroupDAO.checkIfNeedsBelongsToNeedGroup(
          requestBody.needGroupId,
          Object.keys(requestBody.donatedNeeds).map(([key]) => parseInt(key)),
        );

      console.log('Is:', isCorrectIds);

      const childNeeds = await this.childNeedDAO.getNeedsWithIds(
        Object.keys(requestBody.donatedNeeds).map(([key]) => parseInt(key)),
      );

      console.log('ChildNeeds', childNeeds);

      const donationRequests: Promise<Donation>[] = [];

      for (const childNeed of childNeeds) {
        const donatedNeed = requestBody.donatedNeeds[childNeed.needId];
        if (!donatedNeed) throw new ServerError();

        const isMuch =
          childNeed.amount * childNeed.price - childNeed.totals <
          donatedNeed.amount;

        if (childNeed.price * childNeed.amount < donatedNeed.amount || isMuch)
          throw new BadRequestError();

        donationRequests.push(
          this.donationDAO.donateToNeed(user.userId, donatedNeed),
        );
      }

      console.log('don', donationRequests);
      const donations = await Promise.all(donationRequests).then((res) => res);

      return donations;
    } catch (error) {
      console.log('Error', error);
    }
  }
}
