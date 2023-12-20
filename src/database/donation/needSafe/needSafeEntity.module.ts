import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import NeedSafe from 'src/database/donation/needSafe/needSafe.entity';
import NeedSafeDao from 'src/database/donation/needSafe/needSafe.dao';
import EntityModule from 'src/database/main/entity.module';

const NeedSafeProvider = createRepositoryProvider(NeedSafe);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [NeedSafeProvider, NeedSafeDao],
  exports: [NeedSafeDao],
})
export default class NeedSafeEntityModule {}
