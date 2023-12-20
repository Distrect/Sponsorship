import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorShipPayment from 'src/database/sponsor/sponsorshipPayment/sponsorshipPayment.entity';
import SponsorshipPaymnetDao from 'src/database/sponsor/sponsorshipPayment/sponsorsipPaymnet.dao';
import EntityModule from 'src/database/main/entity.module';

const SponsorshipPaymentProvider = createRepositoryProvider(SponsorShipPayment);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [SponsorshipPaymentProvider, SponsorshipPaymnetDao],
  exports: [SponsorshipPaymnetDao],
})
export default class SponsorshipPaymentEntityModule {}
