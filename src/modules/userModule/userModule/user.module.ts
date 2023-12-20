import { Global, Module, forwardRef } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import EntityModule from 'src/database/main/entity.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import IdentificationEntityModule from 'src/database/user/identification/identification.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';
import UserService from 'src/modules/userModule/userModule/user.service';

const OriginalImports = [
  UserEntityModule,
  ChildEntityModule,
  AuthorityEntityModule,
  UserRequestEntityModule,
  IdentificationEntityModule,
];

@Global()
@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
