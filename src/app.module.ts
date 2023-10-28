import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './services/config/config.module';
import { DatabaseModule } from './database/main/database.module';
import MailModule from './services/mail/mail.module';
import SponsorShipModule from 'src/database/sponsor/sponsor/sponsorShip.module';
import ChildEntityModule from 'src/database/user/child/child.module';

@Module({
  imports: [
    GlobalConfigModule,
    DatabaseModule,
    MailModule,
    SponsorShipModule,
    ChildEntityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
