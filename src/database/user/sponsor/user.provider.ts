import User from 'src/database/user/sponsor/user.entity';
import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';

export const UserProvider = createRepositoryProvider(User);
