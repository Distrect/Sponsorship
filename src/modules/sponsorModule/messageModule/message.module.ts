import { Module } from '@nestjs/common';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';

@Module({
  providers: [MessageService],
  exports: [MessageService],
})
export default class MessageModule {}
