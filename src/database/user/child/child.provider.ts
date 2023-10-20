import Child from 'src/database/user/child/child.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

export const ChildProvider = createRepositoryProvider(Child);
