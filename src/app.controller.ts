import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import SponsorshipService from 'src/modules/sponsorModule/sponsor/sponsorShip.service';
import ChildDao from 'src/database/user/child/child.dao';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private sposnorShipService: SponsorshipService,
    private childEntityService: ChildDao,
  ) {}

  @Get()
  async getHello() {
    // await this.childEntityService.deneme();
    await this.sposnorShipService.getUserSponsorShips('User', 1);
    return this.appService.getHello();
  }
}
