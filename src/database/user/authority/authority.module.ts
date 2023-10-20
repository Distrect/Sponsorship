import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import { AuthorityProvider } from './authority.provider';
import { AuthorityEntityService } from './authority.service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthorityProvider, AuthorityEntityService],
  exports: [AuthorityEntityService],
})
export class AuthorityEntityModule {}
