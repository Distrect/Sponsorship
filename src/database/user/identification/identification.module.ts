import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import Identification from 'src/database/user/identification/identification.entity';
import IdentificationDao from 'src/database/user/identification/identification.dao';
import EntityModule from 'src/database/main/entity.module';

const IdentificationProvider = createRepositoryProvider(Identification);

@Module({
  imports: [forwardRef(() => EntityModule) /*DatabaseModule*/],
  providers: [IdentificationProvider, IdentificationDao],
  exports: [IdentificationDao],
})
export default class IdentificationEntityModule {}
