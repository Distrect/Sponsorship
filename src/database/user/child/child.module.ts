import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import { ChildProvider } from 'src/database/user/child/child.provider';
import ChildEntityService from 'src/database/user/child/child.service';

@Module({
  imports: [DatabaseModule],
  providers: [ChildProvider, ChildEntityService],
  exports: [ChildEntityService],
})
export default class ChildEntityModule {}
