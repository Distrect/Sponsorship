import { Injectable } from '@nestjs/common';
import SponsorshipService from 'src/modules/sponsorModule/sponsor/sponsorShip.service';
import UserService from 'src/modules/userModule/userModule/user.service';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class UserManagementRouteService {
  constructor(
    private userService: UserService,
    private sponsorshipService: SponsorshipService,
  ) {}

  public async getUser(authority: IUserCookie, userId: number) {
    return await this.userService.getUserActor(userId);
  }

  public async getUserSponosredChilds(userId: number) {
    return await this.userService.getAllSponsorshipsOfUser(userId);
  }

  public async blockUser(userId: number) {
    return await this.userService.blockUser(userId);
  }
}
