import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { GlobalConfigModule } from './services/config/config.module';
import { AnswerEntityModule } from './database/user/answer/answerEntity.module';
import { QuestionEntityModule } from './database/user/question/questionEntity.module';
import MailModule from './services/mail/mail.module';
import SponsorShipModule from 'src/modules/sponsorModule/sponsor/sponsorShip.module';
import UserModule from 'src/modules/userModule/userModule/user.module';

@Module({
  imports: [
    AnswerEntityModule,
    QuestionEntityModule,
    GlobalConfigModule,
    MailModule,
    SponsorShipModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
