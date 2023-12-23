import { Module } from '@nestjs/common';
import GlobalConfigModule from './services/config/config.module';
import MailModule from './services/mail/mail.module';
import FileModule from 'src/services/file/file.module';
import DatabaseModule from 'src/database/main/database.module';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';
import BusinnessRouteModule from 'src/routes/businness.route.module';

@Module({
  imports: [
    GlobalConfigModule,
    BusinnessLogicModule,
    BusinnessRouteModule,
    FileModule,
    MailModule,
    DatabaseModule,
  ],
})
export default class SponsorshipApplication {}
