import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorshipDao from 'src/database/sponsor/sponsorship/sponsorShip.dao';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import DatabaseModule from 'src/database/main/entity.module';

const SponsorshipProvider = createRepositoryProvider(Sponsorship);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [SponsorshipProvider, SponsorshipDao],
  exports: [SponsorshipDao],
})
export default class SponsorshipEntityModule {}
