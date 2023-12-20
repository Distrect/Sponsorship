import { Module, forwardRef } from '@nestjs/common';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';
import NeedGroupEntityModule from 'src/database/donation/needGroup/needGroupEntity.module';
import DatabaseModule from 'src/database/main/database.module';
import SponsorshipEntityModule from 'src/database/sponsor/sponsorship/sponsorshipEntity.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => UserEntityModule),
    forwardRef(() => ChildEntityModule),
    forwardRef(() => AuthorityEntityModule),
    forwardRef(() => ChildEntityModule),
    forwardRef(() => NeedGroupEntityModule),
    forwardRef(() => ChildNeedEntityModule),
    forwardRef(() => SponsorshipEntityModule),
    forwardRef(() => UserRequestEntityModule),
  ],
})
export default class EntityModule {}
