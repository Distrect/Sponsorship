import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from 'src/database/user/sponsor/user.entity';
import { Injector } from 'src/database/utils/repositoryProvider';

@Injectable()
export default class UserDao {
  @Injector(User) private userRepository: Repository<User>;

  public getUsersofChild(childId: number) {
    return this.userRepository
      .createQueryBuilder('user')
      .innerJoinAndSelect(
        'user.sponsor',
        'sponsor_ship',
        'sponsor_ship.sponsorShipId = user.sponsor',
      )
      .where('sponsor_ship.child.userId = :childId', { childId });
  }
}
