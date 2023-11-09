import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedGroupDao from 'src/database/donation/dao/childNeedGroup/childNeedGroup.dao';
import ChildNeedGroup from 'src/database/donation/dao/childNeedGroup/childNeedGroup.entity';
import DatabaseModule from 'src/database/main/database.module';

const ChildNeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [DatabaseModule],
  providers: [ChildNeedGroupProvider, ChildNeedGroupDao],
  exports: [ChildNeedGroupDao],
})
export default class ChildNeedGroupEntityModule {}
