import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import SponsorshipDao from 'src/database/sponsor/sponsorship/sponsorShip.dao';
import Sponsorship from 'src/database/sponsor/sponsorship/sponsorShip.entity';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import ChildEntityModule from 'src/database/user/child/child.module';

const SponsorshipProvider = createRepositoryProvider(Sponsorship);

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UserEntityModule),
    ChildEntityModule,
  ],
  providers: [SponsorshipProvider, SponsorshipDao],
  exports: [SponsorshipDao],
})
export default class SponsorshipEntityModule {}
