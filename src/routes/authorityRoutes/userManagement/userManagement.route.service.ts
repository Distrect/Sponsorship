import { Injectable } from '@nestjs/common';
import SponsorshipService from 'src/modules/sponsorModule/sponsor/sponsorShip.service';
import UserService from 'src/modules/userModule/userModule/user.service';

@Injectable()
export default class UserManagementRouteService {
  constructor(
    private userService: UserService,
    private sponsorshipService: SponsorshipService,
  ) {}

  public async getUserSponosredChilds(userId: number) {
    return await this.sponsorshipService.getUserSponsoredChilds(userId);
  }
}
