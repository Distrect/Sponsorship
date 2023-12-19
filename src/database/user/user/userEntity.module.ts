import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import UserDao from 'src/database/user/user/user.dao';
import User from 'src/database/user/user/user.entity';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';

const UserProvider = createRepositoryProvider(User);

@Module({
  imports: [DatabaseModule, UserRequestEntityModule],
  providers: [UserProvider, UserDao],
  exports: [UserDao],
})
export default class UserEntityModule {}
