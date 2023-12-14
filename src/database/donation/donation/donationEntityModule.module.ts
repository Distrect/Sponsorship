import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Donation from 'src/database/donation/donation/donation.entity';
import DonationDao from 'src/database/donation/donation/donation.dao';
import DatabaseModule from 'src/database/main/database.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';

export const DonationProvider = createRepositoryProvider(Donation);

@Module({
  imports: [
    DatabaseModule,
    UserEntityModule,
    ChildEntityModule,
    ChildNeedEntityModule,
  ],
  providers: [DonationProvider, DonationDao],
  exports: [DonationDao],
})
export default class DonationEntityModule {}
