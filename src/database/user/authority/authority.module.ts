import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Authority from 'src/database/user/authority/authority.entity';
import AuthorityDao from 'src/database/user/authority/authority.dao';
import DatabaseModule from 'src/database/main/databasew.module';

const AuthorityProvider = createRepositoryProvider(Authority);

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [AuthorityProvider, AuthorityDao],
  exports: [AuthorityDao],
})
export default class AuthorityEntityModule {}
