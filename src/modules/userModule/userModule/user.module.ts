import { Global, Module, forwardRef } from '@nestjs/common';

import DatabaseModule from 'src/database/main/databasew.module';
import UserService from 'src/modules/userModule/userModule/user.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [UserService],
  exports: [UserService],
})
export default class UserModule {}
