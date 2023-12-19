import { Role, Status } from './../index';
import { Repository, FindOptionsWhere, Entity } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { EmptyData, UserNotFoundError } from 'src/utils/error';
import {
  ISkipTake,
  IUserRequestFilters,
} from 'src/database/user/user/user.dao.types';
import User from 'src/database/user/user/user.entity';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';

@Injectable()
export default class UserDao {
  constructor(
    @Injector(User) private userRepository: Repository<User>,
    private userRequestDao: UserRequestDao,
  ) {}

  private async saveUserEntity(entity: User) {
    return await this.userRepository.save(entity);
  }

  public async getUserswithRequests(
    status: Status = Status.WAITING,
    filters: IUserRequestFilters,
    skip: number = 10,
  ) {
    let querry = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.loginRequests', 'user_request')
      // .select('user.userId')
      // .select([
      //   'user.userId',
      //   'user.name',
      //   'user.lastname',
      //   'user_request.requestId',
      //   'user_request.status',
      // ])
      .orderBy('user_request.createdAt', 'DESC')
      .skip((filters.page || 0) * 5)
      .take(5)
      .where('user_request.status = :status', { status });

    if (filters.city) {
      querry = querry.andWhere('user.city = :city', { city: filters.city });
    }

    const usersWithRequests = await querry.getMany();
    console.log(usersWithRequests);
    // if (usersWithRequests.some((userWithRequest) => !!userWithRequest)) {
    //   throw new EmptyData('Some of the Reuqest is null');
    // }

    return usersWithRequests;
  }

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

  public async createUser(userData: Partial<User>) {
    const freshUser = this.userRepository.create({
      ...userData,
      role: Role.User,
    });
    return await this.saveUserEntity(freshUser);
  }

  public async registerUser() {}
}
