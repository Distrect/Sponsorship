import { Module } from '@nestjs/common';
import ChildStatusEntityModule from 'src/database/user/childStatus/childStatusEntityModule.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildService from 'src/modules/userModule/childModule/child.service';
import SafeEntityModule from 'src/database/donation/safe/safeEntity.module';

@Module({
  imports: [ChildEntityModule, ChildStatusEntityModule, SafeEntityModule],
  providers: [ChildService],
  exports: [ChildService],
})
export default class ChildModule {}
