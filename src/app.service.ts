import { Injectable } from '@nestjs/common';
import UserService from 'src/modules/userModule/userModule/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}
  async getHello() {
    return 'Hello World!';
  }
}
