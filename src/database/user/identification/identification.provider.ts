import { Identification } from 'src/database';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

export const IdentificationProvider = createRepositoryProvider(Identification);
