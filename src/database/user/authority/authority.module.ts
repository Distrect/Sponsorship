import { Module, forwardRef } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Authority from 'src/database/user/authority/authority.entity';
import AuthorityDao from 'src/database/user/authority/authority.dao';
import DatabaseModule from 'src/database/main/database.module';
import EntityModule from 'src/database/main/entity.module';

const AuthorityProvider = createRepositoryProvider(Authority);

@Module({
  imports: [forwardRef(() => EntityModule) /*DatabaseModule*/],
  providers: [AuthorityProvider, AuthorityDao],
  exports: [AuthorityDao],
})
export default class AuthorityEntityModule {}
