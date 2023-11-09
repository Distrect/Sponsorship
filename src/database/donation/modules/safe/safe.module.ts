import { Module } from '@nestjs/common';
import SafeService from 'src/database/donation/modules/safe/safe.service';
import NeedSafeEntityModule from 'src/database/donation/dao/needSafe/needSafeEntity.module';

@Module({
  imports: [NeedSafeEntityModule],
  providers: [SafeService],
  exports: [SafeService],
})
export default class SafeModule {}
