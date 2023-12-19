import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import DatabaseModule from 'src/database/main/database.module';
import ChildEntityModule from 'src/database/user/child/child.module';
import ChildNeedEntityModule from 'src/database/donation/childNeed/childNeedEntity.module';

export const NeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [DatabaseModule, ChildEntityModule, ChildNeedEntityModule],
  providers: [NeedGroupProvider, ChildNeedGroupDao],
  exports: [ChildNeedGroupDao],
})
export default class NeedGroupEntityModule {}
