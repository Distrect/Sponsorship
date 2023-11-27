import { Module } from '@nestjs/common';
import FixNeedEntityModule from 'src/database/sponsor/dao/fixNeed/fixNeedEntity.module';
import SponsorshipEntityModule from 'src/database/sponsor/dao/sponsorship/sponsorshipEntity.module';
import SponsorshipService from 'src/database/sponsor/modules/sponsor/sponsorship.service';
import ChildEntityModule from 'src/database/user/child/child.module';
import UserEntityModule from 'src/database/user/sponsor/userEntity.module';

@Module({
  imports: [
    SponsorshipEntityModule,
    UserEntityModule,
    ChildEntityModule,
    FixNeedEntityModule,
  ],
  providers: [SponsorshipService],
  exports: [SponsorshipService],
})
export default class SponsorShipModule {}
