import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import FixNeed from 'src/database/sponsor/entities/fixNeed.entity';
import FixNeedDao from 'src/database/sponsor/dao/fixNeed.dao';
import FixNeedService from 'src/database/sponsor/modules/fixNeed/fixNeed.service';

const FixNeedProvider = createRepositoryProvider(FixNeed);

@Module({
  imports: [DatabaseModule],
  providers: [FixNeedProvider, FixNeedDao, FixNeedService],
})
export default class FixNeedModule {}
