import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import DatabaseModule from 'src/database/main/entity.module';

const FixNeedProvder = createRepositoryProvider(FixNeed);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [FixNeedProvder, FixNeedDao],
  exports: [FixNeedDao],
})
export default class FixNeedEntityModule {}
