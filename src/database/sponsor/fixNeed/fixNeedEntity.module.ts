import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import FixNeedDao from 'src/database/sponsor/fixNeed/fixNeed.dao';
import FixNeed from 'src/database/sponsor/fixNeed/fixNeed.entity';
import DatabaseModule from 'src/database/main/databasew.module';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';

const FixNeedProvder = createRepositoryProvider(FixNeed);

@Module({
  imports: [forwardRef(() => BusinnessLogicModule)],
  providers: [FixNeedProvder, FixNeedDao],
  exports: [FixNeedDao],
})
export default class FixNeedEntityModule {}
