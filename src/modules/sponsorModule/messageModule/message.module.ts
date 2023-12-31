import { Module, forwardRef } from '@nestjs/common';
import DatabaseModule from 'src/database/main/database.module';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';

@Module({
  imports: [forwardRef(() => DatabaseModule)],
  providers: [MessageService],
  exports: [MessageService],
})
export default class MessageModule {}
