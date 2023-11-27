import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import SponsorshipDao from 'src/database/sponsor/dao/sponsorship/sponsorship.dao';
import Sponsorship from 'src/database/sponsor/dao/sponsorship/sponsorship.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const SponsorshipProvider = createRepositoryProvider(Sponsorship);

@Module({
  imports: [DatabaseModule],
  providers: [SponsorshipProvider, SponsorshipDao],
  exports: [SponsorshipDao],
})
export default class SponsorshipEntityModule {}
