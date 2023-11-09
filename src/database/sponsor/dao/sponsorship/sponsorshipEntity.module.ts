import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import SponsorshipDao from 'src/database/sponsor/dao/sponsorship/sponsorShip.dao';
import SponsorShip from 'src/database/sponsor/dao/sponsorship/sponsorShip.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const SponsorshipProvider = createRepositoryProvider(SponsorShip);

@Module({
  imports: [DatabaseModule],
  providers: [SponsorshipProvider, SponsorshipDao],
  exports: [SponsorshipDao],
})
export default class SponsorshipEntityModule {}
