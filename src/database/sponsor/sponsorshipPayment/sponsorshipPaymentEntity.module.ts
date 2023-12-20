import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';
import SponsorshipPaymnetDao from 'src/database/sponsor/sponsorshipPayment/sponsorsipPaymnet.dao';

const SponsorshipPaymentProvider = createRepositoryProvider(SponsorShipPayment);

@Module({
  imports: [DatabaseModule],
  providers: [SponsorshipPaymentProvider, SponsorshipPaymnetDao],
  exports: [SponsorshipPaymnetDao],
})
export default class SponsorshipPaymentEntityModule {}
