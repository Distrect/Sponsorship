import { Module } from '@nestjs/common';
import SafeService from 'src/modules/donationModule/safe/safe.service';
import NeedSafeEntityModule from 'src/database/donation/needSafe/needSafeEntity.module';
import SafeEntityModule from 'src/database/donation/safe/safeEntity.module';

@Module({
  imports: [NeedSafeEntityModule, SafeEntityModule],
  providers: [SafeService],
  exports: [SafeService],
})
export default class SafeModule {}
