import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import NeedGroupDao from 'src/database/donation/needGroup/needGroup.dao';
import NeedGroup from 'src/database/donation/needGroup/needGroup.entity';
import DatabaseModule from 'src/database/main/databasew.module';

export const NeedGroupProvider = createRepositoryProvider(NeedGroup);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [NeedGroupProvider, NeedGroupDao],
  exports: [NeedGroupDao],
})
export default class NeedGroupEntityModule {}
