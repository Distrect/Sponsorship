import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import DatabaseModule from 'src/database/main/database.module';
import NeedSafeDao from 'src/database/donation/needSafe/needSafe.dao';

const NeedSafeProvider = createRepositoryProvider(NeedSafe);

@Module({
  imports: [DatabaseModule],
  providers: [NeedSafeProvider, NeedSafeDao],
  exports: [NeedSafeDao],
})
export default class NeedSafeEntityModule {}
