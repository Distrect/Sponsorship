import { Repository, FindOptionsWhere } from 'typeorm';
import { Injectable } from '@nestjs/common';
import User from 'src/database/user/user/user.entity';
import { Injector } from 'src/database/utils/repositoryProvider';
import { UserNotFoundError } from 'src/utils/error';

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

  public async getUser(userParams: FindOptionsWhere<User>) {
    const user = await this.userRepository.findOne({
      where: { ...userParams },
    });

    if (!user) throw new UserNotFoundError();

    return user;
  }
}
