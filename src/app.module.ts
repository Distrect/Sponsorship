import { AnswerEntityModule } from './database/user/answer/answerEntity.module';
import { QuestionEntityModule } from './database/user/question/questionEntity.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GlobalConfigModule } from './services/config/config.module';
import MailModule from './services/mail/mail.module';
import SponsorShipModule from 'src/modules/sponsorModules/sponsor/sponsorShip.module';

@Module({
  imports: [
    AnswerEntityModule,
    QuestionEntityModule,
    GlobalConfigModule,
    MailModule,
    SponsorShipModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
