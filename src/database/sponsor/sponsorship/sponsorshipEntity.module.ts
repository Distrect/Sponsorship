import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorshipDAO from 'src/database/sponsor/sponsorship/sponsorShip.DAO';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import DatabaseModule from 'src/database/main/database.module';

const SponsorshipProvider = createRepositoryProvider(Sponsorship);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [SponsorshipProvider, SponsorshipDAO],
  exports: [SponsorshipDAO],
})
export default class SponsorshipEntityModule {}
