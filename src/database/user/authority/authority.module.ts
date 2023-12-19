import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Authority from 'src/database/user/authority/authority.entity';
import AuthorityDao from 'src/database/user/authority/authority.dao';

//const AuthorityProvider = createRepositoryProvider(Authority);

const AuthorityProvider = {
  provide: 'AUTHORITY_REPOSITORY',
  useFactory: async (dataSource: DataSource) =>
    dataSource.getRepository(Authority),
  inject: ['SPONSORSHIP'],
};

@Module({
  providers: [AuthorityProvider, AuthorityDao],
  exports: [AuthorityDao],
})
export default class AuthorityEntityModule {}
