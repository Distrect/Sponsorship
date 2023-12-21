import { Module, forwardRef } from '@nestjs/common';
import FixNeedService from 'src/modules/sponsorModule/fixNeed/fixNeed.service';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';
import DatabaseModule from 'src/database/main/databasew.module';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [FixNeedService],
})
export default class FixNeedModule {}
