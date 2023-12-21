import { Module, forwardRef } from '@nestjs/common';
import { DonationMainModule } from 'src/modules/donationModule/donation.main.module';
import DatabaseModule from 'src/database/main/databasew.module';
import SponsorshipMainModule from 'src/modules/sponsorModule/sponsorship.main.module';
import ActorMainModule from 'src/modules/userModule/actors.main.module';
import SponsorshipApplication from 'src/app.module';

const BusinnessMainModules = [
  ActorMainModule,
  SponsorshipMainModule,
  DonationMainModule,
];
//forwardRef(() => SponsorshipApplication),
@Module({
  imports: [...BusinnessMainModules],
  exports: BusinnessMainModules,
})
export default class BusinnessLogicModule {}
