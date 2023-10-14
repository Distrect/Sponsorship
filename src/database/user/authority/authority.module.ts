import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/main/database.module';
import { authorityProvider } from './authority.provider';
import { AuthorityEntityService } from './authority.service';

@Module({
  imports: [DatabaseModule],
  providers: [...authorityProvider, AuthorityEntityService],
  exports: [AuthorityEntityService],
})
export class AuthorityEntityModule {}
