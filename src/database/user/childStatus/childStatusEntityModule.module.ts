import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import ChildStatusDao from 'src/database/user/childStatus/childStatus.dao';
import ChildStatus from 'src/database/user/childStatus/childStatus.entity';
import EntityModule from 'src/database/main/entity.module';

const ChildStatusProvider = createRepositoryProvider(ChildStatus);

@Module({
  imports: [forwardRef(() => EntityModule) /*DatabaseModule*/],
  providers: [ChildStatusProvider, ChildStatusDao],
  exports: [ChildStatusDao],
})
export default class ChildStatusEntityModule {}
