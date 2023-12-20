import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import NeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import DatabaseModule from 'src/database/main/entity.module';

export const NeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [NeedGroupProvider, NeedGroupDao],
  exports: [NeedGroupDao],
})
export default class NeedGroupEntityModule {}
