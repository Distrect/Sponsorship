import { Module } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import FixNeedDao from 'src/database/sponsor/dao/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/dao/fixNeed/fixNeed.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const FixNeedProvder = createRepositoryProvider(FixNeed);

@Module({
  imports: [DatabaseModule],
  providers: [FixNeedProvder, FixNeedDao],
  exports: [FixNeedDao],
})
export default class FixNeedEntityModule {}
