import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import ChildNeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import EntityModule from 'src/database/main/entity.module';

export const NeedGroupProvider = createRepositoryProvider(ChildNeedGroup);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [NeedGroupProvider, ChildNeedGroupDao],
  exports: [ChildNeedGroupDao],
})
export default class NeedGroupEntityModule {}
