import { Module } from '@nestjs/common';
import FixNeedService from 'src/modules/sponsorModule/fixNeed/fixNeed.service';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';

@Module({
  imports: [FixNeedEntityModule],
  providers: [FixNeedService],
})
export default class FixNeedModule {}
