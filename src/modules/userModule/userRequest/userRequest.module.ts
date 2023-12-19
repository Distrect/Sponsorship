import { Module, Global } from '@nestjs/common';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';
import UserRequestService from 'src/modules/userModule/userRequest/userRequest.service';

@Global()
@Module({
  imports: [UserEntityModule, UserRequestEntityModule],
  providers: [UserRequestService],
  exports: [UserRequestService],
})
export default class UserRequestModule {}
