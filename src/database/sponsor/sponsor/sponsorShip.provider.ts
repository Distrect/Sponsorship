import { createRepositoryProvider } from 'src/database/utils/repositoryProvider';
import SponsorShip from 'src/database/sponsor/sponsor/sponsorShip.entity';

export const SponsorshipProvider = createRepositoryProvider(SponsorShip);
