import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import NeedSafe from 'src/database/donation/entities/needSafe.entity';
import DatabaseModule from 'src/database/main/database.module';
import NeedSafeDao from 'src/database/donation/dao/needSafe.dao';
import SafeService from 'src/database/donation/modules/safe/safe.service';

const NeedSafeProvider = createRepositoryProvider(NeedSafe);

@Module({
  imports: [DatabaseModule],
  providers: [NeedSafeProvider, NeedSafeDao, SafeService],
  exports: [SafeService],
})
export default class SafeModule {}
