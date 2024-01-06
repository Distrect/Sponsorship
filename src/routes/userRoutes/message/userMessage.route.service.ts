import { Injectable } from '@nestjs/common';
import MessageService from 'src/modules/sponsorModule/messageModule/message.service';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class UserMessageRotueService {
  constructor(private messageService: MessageService) {}

  public async getConversations(user: IUserCookie) {
    return await this.messageService.getMessagesOfUser(user);
  }
}
