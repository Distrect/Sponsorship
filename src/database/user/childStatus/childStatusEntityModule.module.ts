import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import ChildStatusDao from 'src/database/user/childStatus/childStatus.dao';

@Module({
  imports: [DatabaseModule],
  providers: [ChildStatusDao],
  exports: [ChildStatusDao],
})
export default class ChildStatusEntityModule {}
