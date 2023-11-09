import { Module } from '@nestjs/common';
import SponsorshipEntityModule from 'src/database/sponsor/dao/sponsorship/sponsorshipEntity.module';
import SponsorshipService from 'src/database/sponsor/modules/sponsor/sponsorShip.service';

@Module({
  imports: [SponsorshipEntityModule],
  providers: [SponsorshipService],
  exports: [SponsorshipService],
})
export default class SponsorShipModule {}
