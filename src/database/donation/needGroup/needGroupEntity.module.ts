import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import DatabaseModule from 'src/database/main/database.module';

export const NeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [DatabaseModule],
  providers: [NeedGroupProvider, ChildNeedGroupDao],
  exports: [ChildNeedGroupDao],
})
export default class NeedGroupEntityModule {}
