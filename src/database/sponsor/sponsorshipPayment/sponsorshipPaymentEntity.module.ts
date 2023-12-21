import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';
import SponsorshipPaymnetDAO from 'src/database/sponsor/sponsorshipPayment/sponsorsipPaymnet.DAO';
import DatabaseModule from 'src/database/main/database.module';

const SponsorshipPaymentProvider = createRepositoryProvider(SponsorShipPayment);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [SponsorshipPaymentProvider, SponsorshipPaymnetDAO],
  exports: [SponsorshipPaymnetDAO],
})
export default class SponsorshipPaymentEntityModule {}
