import { Module, forwardRef } from '@nestjs/common';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';
import EntityModule from 'src/database/main/entity.module';

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [ChildNeedService],
  exports: [ChildNeedService],
})
export default class ChildNeedModule {}
