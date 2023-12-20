import { Module, forwardRef } from '@nestjs/common';
import FixNeedService from 'src/modules/sponsorModule/fixNeed/fixNeed.service';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';
import EntityModule from 'src/database/main/entity.module';

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [FixNeedService],
})
export default class FixNeedModule {}
