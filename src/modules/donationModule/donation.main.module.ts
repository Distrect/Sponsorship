import { Module } from '@nestjs/common';
import SafeModule from 'src/modules/donationModule/safe/safe.module';
import ChildNeedModule from 'src/modules/donationModule/childNeed/childNeed.module';
import NeedGroupModule from 'src/modules/donationModule/needGroup/needGroup.module';

const DonationModules = [ChildNeedModule, SafeModule, NeedGroupModule];

@Module({
  imports: DonationModules,
  exports: DonationModules,
})
export default class DonationMainModule {}
