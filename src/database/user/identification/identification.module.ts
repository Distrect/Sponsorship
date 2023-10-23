import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import { IdentificationProvider } from 'src/database/user/identification/identification.provider';
import IdentificationEntityService from 'src/database/user/identification/identification.service';

@Module({
  imports: [DatabaseModule],
  providers: [IdentificationProvider, IdentificationEntityService],
  exports: [IdentificationEntityService],
})
export default class IdentificationEntityModule {}
