import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './services/config/config.module';
import MailModule from './services/mail/mail.module';
import SponsorShipModule from 'src/database/sponsor/modules/sponsor/sponsorShip.module';

@Module({
  imports: [GlobalConfigModule, MailModule, SponsorShipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
