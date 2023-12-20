import { Module } from '@nestjs/common';
import FixNeedModule from 'src/modules/sponsorModule/fixNeed/fixNeed.module';
import SponsorShipModule from 'src/modules/sponsorModule/sponsor/sponsorShip.module';

const SponsorshipModules = [FixNeedModule, SponsorShipModule];

@Module({ imports: SponsorshipModules, exports: SponsorshipModules })
export default class SponsorshipMainModule {}
