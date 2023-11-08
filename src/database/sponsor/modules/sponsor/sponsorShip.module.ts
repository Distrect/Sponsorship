import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import SponsorshipDao from 'src/database/sponsor/dao/sponsorShip.dao';
import SponsorShip from 'src/database/sponsor/entities/sponsorShip.entity';
import SponsorshipService from 'src/database/sponsor/modules/sponsor/sponsorShip.service';

const SponsorshipProvider = createRepositoryProvider(SponsorShip);

@Module({
  imports: [DatabaseModule],
  providers: [SponsorshipProvider, SponsorshipDao, SponsorshipService],
  exports: [SponsorshipService],
})
export default class SponsorShipModule {}
