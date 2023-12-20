import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorshipDao from 'src/database/sponsor/sponsorship/sponsorShip.dao';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import EntityModule from 'src/database/main/entity.module';

const SponsorshipProvider = createRepositoryProvider(Sponsorship);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [SponsorshipProvider, SponsorshipDao],
  exports: [SponsorshipDao],
})
export default class SponsorshipEntityModule {}
