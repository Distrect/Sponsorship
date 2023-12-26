import { Injectable } from '@nestjs/common';
import MessageDAO from 'src/database/sponsor/message/message.dao';

@Injectable()
export default class MessageService {
  constructor(private messageDAO: MessageDAO) {}
}
