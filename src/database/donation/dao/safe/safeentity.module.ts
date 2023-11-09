import { Module } from '@nestjs/common';
import { Safe } from 'src/database/donation/dao/safe/safe.entity';
import DatabaseModule from 'src/database/main/database.module';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

const SafeEntityProvider = createRepositoryProvider(Safe);

@Module({
  imports: [DatabaseModule],
  providers: [SafeEntityProvider],
})
export default class SafeEntityModule {}
