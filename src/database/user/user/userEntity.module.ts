import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import UserDao from 'src/database/user/user/user.dao';
import User from 'src/database/user/user/user.entity';
import DatabaseModule from 'src/database/main/database.module';

const UserProvider = createRepositoryProvider(User);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [UserProvider, UserDao],
  exports: [UserDao],
})
export default class UserEntityModule {}
