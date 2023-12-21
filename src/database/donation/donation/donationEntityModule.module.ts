import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Donation from 'src/database/donation/donation/donation.entity';
import DonationDao from 'src/database/donation/donation/donation.dao';
import DatabaseModule from 'src/database/main/database.module';

const DonationProvider = createRepositoryProvider(Donation);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [DonationProvider, DonationDao],
  exports: [DonationDao],
})
export default class DonationDatabaseModule {}
