import { Global, Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import IdentificationEntityModule from 'src/database/user/identification/identification.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';
import UserService from 'src/modules/userModule/userModule/user.service';

@Global()
@Module({
  imports: [
    DatabaseModule,
    UserEntityModule,
    ChildEntityModule,
    AuthorityEntityModule,
    UserRequestEntityModule,
    IdentificationEntityModule,
  ],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
