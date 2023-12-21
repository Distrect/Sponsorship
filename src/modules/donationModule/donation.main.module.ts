import { Module } from '@nestjs/common';
import ChildNeedModule from 'src/modules/donationModule/childNeed/childNeed.module';
import SafeModule from 'src/modules/donationModule/safe/safe.module';

const DonationModules = [ChildNeedModule, SafeModule];

@Module({
  imports: DonationModules,
  exports: DonationModules,
})
export default class DonationMainModule {}
