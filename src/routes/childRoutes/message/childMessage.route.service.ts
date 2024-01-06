import { Injectable } from '@nestjs/common';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class ChildMessageRotueService {
  constructor(private messageService: MessageService) {}

  public async getConversations(child: IUserCookie) {
    return await this.messageService.getMessagesOfUser(child);
  }
}
