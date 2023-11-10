import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Safe from 'src/database/donation/entities/safe/safe.entity';
import DatabaseModule from 'src/database/main/database.module';
import SafeDao from 'src/database/donation/entities/safe/safe.dao';

const SafeEntityProvider = createRepositoryProvider(Safe);

@Module({
  imports: [DatabaseModule],
  providers: [SafeEntityProvider, SafeDao],
  exports: [SafeDao],
})
export default class SafeEntityModule {}
