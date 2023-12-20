import { Module, Global, forwardRef } from '@nestjs/common';
import EntityModule from 'src/database/main/entity.module';
import UserEntityModule from 'src/database/user/user/userEntity.module';
import UserRequestEntityModule from 'src/database/user/userRequest/userRequestEntity.module';
import UserRequestService from 'src/modules/userModule/userRequest/userRequest.service';

@Global()
@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [UserRequestService],
  exports: [UserRequestService],
})
export default class UserRequestModule {}
