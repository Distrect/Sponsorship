import { Authority } from './authority.entity';

export const authorityProvider = [
  {
    provide: 'AUTHORITY_REPOSITORY',
    useValue: Authority,
  },
];
