import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import Identification from 'src/database/user/identification/identification.entity';
import IdentificationDao from 'src/database/user/identification/identification.dao';

const IdentificationProvider = createRepositoryProvider(Identification);

@Module({
  imports: [DatabaseModule],
  providers: [IdentificationProvider, IdentificationDao],
  exports: [IdentificationDao],
})
export default class IdentificationEntityModule {}
