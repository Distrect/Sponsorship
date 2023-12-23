import Sponsorship from 'src/database/sponsor/sponsorship/sponsorship.entity';
import { FindOptionsWhere } from 'typeorm';

export type FindSponsorship = FindOptionsWhere<Sponsorship>;
