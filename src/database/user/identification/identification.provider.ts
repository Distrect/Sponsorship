import Identification from 'src/database/user/identification/identification.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

export const IdentificationProvider = createRepositoryProvider(Identification);
