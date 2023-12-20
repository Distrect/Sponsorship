import { Module } from '@nestjs/common';
import GlobalConfigModule from './services/config/config.module';
import MailModule from './services/mail/mail.module';
import FileModule from 'src/services/file/file.module';
import EntityModule from 'src/database/main/entity.module';
import BusinnessLogicModule from 'src/modules/businnes.logic.module';
import BusinnessRouteModule from 'src/routes/businness.main.route.module';

@Module({
  imports: [
    GlobalConfigModule,
    BusinnessLogicModule,
    BusinnessRouteModule,
    FileModule,
    MailModule,
    EntityModule,
  ],
})
export default class SponsorshipApplication {}
