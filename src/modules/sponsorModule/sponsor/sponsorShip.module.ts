import { Module, forwardRef } from '@nestjs/common';
import FixNeedEntityModule from 'src/database/sponsor/fixNeed/fixNeedEntity.module';
import SponsorshipEntityModule from 'src/database/sponsor/sponsorship/sponsorshipEntity.module';
import SponsorshipService from 'src/modules/sponsorModule/sponsor/sponsorShip.service';
import ChildEntityModule from 'src/database/user/child/child.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import EntityModule from 'src/database/main/entity.module';

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [SponsorshipService],
  exports: [SponsorshipService],
})
export default class SponsorShipModule {}
