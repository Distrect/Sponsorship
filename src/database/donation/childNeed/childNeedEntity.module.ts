import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import ChildNeedDao from 'src/database/donation/childNeed/childNeed.dao';
import ChildNeed from 'src/database/donation/childNeed/childNeed.entity';
import EntityModule from 'src/database/main/entity.module';

const ChildNeedProvider = createRepositoryProvider(ChildNeed);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [ChildNeedProvider, ChildNeedDao],
  exports: [ChildNeedDao],
})
export default class ChildNeedEntityModule {}
