import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import SponsorshipService from 'src/database/sponsor/sponsor/sponsorShip.service';
import ChildEntityService from 'src/database/user/child/child.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sposnorShipService: SponsorshipService,
    private childEntityService: ChildEntityService,
  ) {}

  @Get()
  async getHello() {
    // await this.childEntityService.deneme();
    await this.sposnorShipService.getUserSponsorShips('User', 1);
    return this.appService.getHello();
  }
}
