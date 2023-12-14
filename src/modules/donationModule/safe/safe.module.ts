import { Module } from '@nestjs/common';
import SafeService from 'src/new modules/donationModules/safe/safe.service';
import NeedSafeEntityModule from 'src/database/donation/entities/needSafe/needSafeEntity.module';
import SafeEntityModule from 'src/database/donation/entities/safe/safeEntity.module';

@Module({
  imports: [NeedSafeEntityModule, SafeEntityModule],
  providers: [SafeService],
  exports: [SafeService],
})
export default class SafeModule {}
