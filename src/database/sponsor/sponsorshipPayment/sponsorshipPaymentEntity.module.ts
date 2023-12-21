import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';
import SponsorshipPaymnetDao from 'src/database/sponsor/sponsorshipPayment/sponsorsipPaymnet.dao';
import DatabaseModule from 'src/database/main/databasew.module';

const SponsorshipPaymentProvider = createRepositoryProvider(SponsorShipPayment);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [SponsorshipPaymentProvider, SponsorshipPaymnetDao],
  exports: [SponsorshipPaymnetDao],
})
export default class SponsorshipPaymentEntityModule {}
