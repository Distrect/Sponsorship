import { Module } from '@nestjs/common';
import ChildModule from 'src/modules/userModule/childModule/child.module';
import UserRequestModule from 'src/modules/userModule/userRequest/userRequest.module';

const ActorModules = [ChildModule, UserRequestModule];

@Module({
  imports: ActorModules,
  exports: ActorModules,
})
export default class ActorMainModule {}
