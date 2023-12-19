import { Injectable } from '@nestjs/common';
import { CityEnum, Status } from 'src/database/user';
import UserDao from 'src/database/user/user/user.dao';
import User from 'src/database/user/user/user.entity';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';
import FileService, { IIDFile } from 'src/services/file/file.service';

export interface UserWithIDImages extends User {
  idIamges: IIDFile;
}

@Injectable()
export default class UserRequestService {
  constructor(
    private userRequestDao: UserRequestDao,
    private userDao: UserDao,
    private fileService: FileService,
  ) {}

  private joinUserAndID(user: User, ID: IIDFile) {
    const extendedUser = ((user as UserWithIDImages).idIamges = ID);
    return extendedUser;
  }

  private getUserRequestIDs(users: User[]) {
    const userFiles = users.map((user) =>
      this.joinUserAndID(
        user,
        this.fileService.getFile(user, 'identification'),
      ),
    );

    return userFiles;
  }

  public async getAwaitingUsers(city: CityEnum, page: number) {
    const requests = await this.userDao.getUserswithRequests(
      Status.WAITING,
      {
        page,
        city,
      },
      10,
    );

    const requestsWithIDs = this.getUserRequestIDs(requests);

    return requestsWithIDs;
  }

  public async asnwerRequest(
    requestId: number,
    answer: Status.APPROVED | Status.DENIED,
  ) {
    const request = await this.userRequestDao.answerUserRequest(
      requestId,
      answer,
    );

    return request;
  }
}
