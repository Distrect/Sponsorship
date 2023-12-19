import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const UserRequestProvider = createRepositoryProvider(UserRequest);

@Module({
  imports: [DatabaseModule],
  providers: [UserRequestProvider, UserRequestDao],
  exports: [UserRequestDao],
})
export default class UserRequestEntityModule {}
