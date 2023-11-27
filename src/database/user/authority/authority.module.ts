import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import DatabaseModule from 'src/database/main/database.module';
import Authority from 'src/database/user/authority/authority.entity';
import AuthorityDao from 'src/database/user/authority/authority.dao';

const AuthorityProvider = createRepositoryProvider(Authority);

@Module({
  imports: [DatabaseModule],
  providers: [AuthorityProvider, AuthorityDao],
  exports: [AuthorityDao],
})
export class AuthorityEntityModule {}
