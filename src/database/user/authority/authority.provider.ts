import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import Authority from './authority.entity';

export const AuthorityProvider = createRepositoryProvider(Authority);

/*export const authorityProvider = [
  {
    provide: 'AUTHORITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Authority),
    inject: ['SPONSORSHIP'],
  },
];*/
