import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Safe from 'src/database/donation/safe/safe.entity';
import SafeDao from 'src/database/donation/safe/safe.dao';
import EntityModule from 'src/database/main/entity.module';

const SafeEntityProvider = createRepositoryProvider(Safe);

@Module({
  imports: [forwardRef(() => EntityModule)],
  providers: [SafeEntityProvider, SafeDao],
  exports: [SafeDao],
})
export default class SafeEntityModule {}
