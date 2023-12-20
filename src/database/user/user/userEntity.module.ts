import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import UserDao from 'src/database/user/user/user.dao';
import User from 'src/database/user/user/user.entity';
import EntityModule from 'src/database/main/entity.module';

const UserProvider = createRepositoryProvider(User);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [UserProvider, UserDao],
  exports: [UserDao],
})
export default class UserEntityModule {}
