import { Injectable } from '@nestjs/common';
import UserDao from 'src/database/user/user/user.dao';
import UserService from 'src/modules/userModule/userModule/user.service';

@Injectable()
export class AppService {
  // constructor(private userDao: UserDao) {}
  async getHello() {
    // return await this.userDao.getUser({ userId: 1 });
  }
}
