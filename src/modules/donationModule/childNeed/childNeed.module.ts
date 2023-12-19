import { Module } from '@nestjs/common';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';
import ChildNeedController from 'src/routes/authorityRoutes/needManagement/needManagement.route.controller';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';
import ChildEntityModule from 'src/database/user/child/child.module';
import SafeModule from 'src/modules/donationModule/safe/safe.module';
import NeedGroupEntityModule from 'src/database/donation/needGroup/needGroupEntity.module';
import DonationEntityModule from 'src/database/donation/donation/donationEntityModule.module';

@Module({
  imports: [
    ChildEntityModule,
    SafeModule,
    ChildNeedEntityModule,
    NeedGroupEntityModule,
    DonationEntityModule,
  ],
  providers: [ChildNeedService],
  controllers: [ChildNeedController],
  exports: [ChildNeedService],
})
export default class ChildNeedModule {}
