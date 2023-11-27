import { Module } from '@nestjs/common';
import ChildNeedEntityModule from 'src/database/donation/entities/childNeed/childNeedEntity.module';
import ChildNeedController from 'src/new modules/donationModules/childNeed/childNeed.controller';
import ChildNeedService from 'src/new modules/donationModules/childNeed/childNeed.service';
import ChildEntityModule from 'src/database/user/child/child.module';
import SafeModule from 'src/new modules/donationModules/safe/safe.module';
import ChildNeedGroupEntityModule from 'src/database/donation/entities/childNeedGroup/childneedgroupentity.module';

@Module({
  imports: [
    ChildEntityModule,
    SafeModule,
    ChildNeedEntityModule,
    ChildNeedGroupEntityModule,
  ],
  providers: [ChildNeedService],
  controllers: [ChildNeedController],
})
export default class ChildNeedModule {}
