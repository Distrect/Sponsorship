import { Module } from '@nestjs/common';
import ChildNeedDao from 'src/database/donation/dao/childNeed/childNeed.dao';
import ChildNeed from 'src/database/donation/dao/childNeed/childNeed.entity';
import DatabaseModule from 'src/database/main/database.module';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const ChildNeedProvider = createRepositoryProvider(ChildNeed);

@Module({
  imports: [DatabaseModule],
  providers: [ChildNeedProvider, ChildNeedDao],
  exports: [ChildNeedDao],
})
export default class ChildNeedEntityModule {}
