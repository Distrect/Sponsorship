import { Module, forwardRef } from '@nestjs/common';
import SafeService from 'src/modules/donationModule/safe/safe.service';
import EntityModule from 'src/database/main/entity.module';

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [SafeService],
  exports: [SafeService],
})
export default class SafeModule {}
