import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import SponsorshipDao from 'src/database/sponsor/sponsor/sponsorShip.dao';
import { SponsorshipProvider } from 'src/database/sponsor/sponsor/sponsorShip.provider';
import SponsorshipService from 'src/database/sponsor/sponsor/sponsorShip.service';

@Module({
  imports: [DatabaseModule],
  providers: [SponsorshipProvider, SponsorshipDao, SponsorshipService],
  exports: [SponsorshipService],
})
export default class SponsorShipModule {}
