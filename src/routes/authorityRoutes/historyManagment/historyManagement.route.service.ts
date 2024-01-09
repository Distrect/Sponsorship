import { Injectable } from '@nestjs/common';
import DonationService from 'src/modules/donationModule/donation/donation.service';
import { HistoryDTO } from 'src/routes/authorityRoutes/historyManagment/historyManagement.route.interface';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class HistoryManagementRouteService {
  constructor(private donationService: DonationService) {}

  public async listHistory(
    authority: IUserCookie,
    requestBody: HistoryDTO,
    page: number,
  ) {
    if (requestBody.type === 'Donation') {
      return await this.donationService.listPaumentHistory(requestBody, page);
    }

    return 2;
  }
}
