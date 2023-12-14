import { Module } from '@nestjs/common';
import AdminEntityModule from 'src/database/user/admin/adminEntity.module';
import AuthorityEntityModule from 'src/database/user/authority/authority.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';

@Module({
  imports: [
    AdminEntityModule,
    AuthorityEntityModule,
    ChildEntityModule,
    UserEntityModule,
  ],
  providers: [],
  exports: [],
})
export default class UserModule {}
