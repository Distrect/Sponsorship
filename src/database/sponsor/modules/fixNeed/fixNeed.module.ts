import { Module } from '@nestjs/common';
import FixNeedService from 'src/database/sponsor/modules/fixNeed/fixNeed.service';
import FixNeedEntityModule from 'src/database/sponsor/dao/fixNeed/fixNeedEntity.module';

@Module({
  imports: [FixNeedEntityModule],
  providers: [FixNeedService],
})
export default class FixNeedModule {}
