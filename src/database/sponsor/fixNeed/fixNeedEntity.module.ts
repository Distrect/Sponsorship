import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import ChildEntityModule from 'src/database/user/child/child.module';

const FixNeedProvder = createRepositoryProvider(FixNeed);

@Module({
  imports: [DatabaseModule, ChildEntityModule],
  providers: [FixNeedProvder, FixNeedDao],
  exports: [FixNeedDao],
})
export default class FixNeedEntityModule {}
