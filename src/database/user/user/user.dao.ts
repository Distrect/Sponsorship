import { Role, Status } from './../index';
import { Repository, FindOptionsWhere, Entity } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Injector } from 'src/database/utils/repositoryProvider';
import { EmptyData, UserNotFoundError } from 'src/utils/error';
import {
  ISkipTake,
  IUserRequestFilters,
} from 'src/database/user/user/user.DAO.types';
import User from 'src/database/user/user/user.entity';
import UserRequestDAO from 'src/database/user/userRequest/userRequest.DAO';

@Injectable()
export default class UserDAO {
  constructor(
    @Injector(User) public userRepository: Repository<User>,
    private userRequestDAO: UserRequestDAO,
  ) {}

  public async saveUserEntity(entity: User) {
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
      .orderBy('user_request.createdAt', 'ASC')
      .skip((filters.page || 0) * skip)
      .take(skip)
      .where('user_request.status = :status', { status });

    if (filters.city) {
      querry = querry.andWhere('user.city = :city', { city: filters.city });
    }

    const usersWithRequests = await querry.getMany();

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
