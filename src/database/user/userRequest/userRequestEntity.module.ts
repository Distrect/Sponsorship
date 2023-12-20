import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import EntityModule from 'src/database/main/entity.module';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';
import UserRequest from 'src/database/user/userRequest/userRequest.entity';
import DatabaseModule from 'src/database/main/database.module';

const UserRequestProvider = createRepositoryProvider(UserRequest);

@Module({
  imports: [DatabaseModule],
  providers: [UserRequestProvider, UserRequestDao],
  exports: [UserRequestDao],
})
export default class UserRequestEntityModule {}
