import { Injectable } from '@nestjs/common';
import UserRequestService from 'src/modules/userModule/userRequest/userRequest.service';
import { AnswerDTO } from 'src/routes/authorityRoutes/userRequest/userRequest.route.dto';
import { IUserCookie } from 'src/shared/types';

@Injectable()
export default class UserRequestRouteService {
  constructor(private userRequestService: UserRequestService) {}

  public async getRequests(authority: IUserCookie, page: number) {
    const requests = await this.userRequestService
      .getAwaitingUsers(authority.city, page)
      .catch((ERR) => console.error(ERR));

    return requests;
  }

  public async answerRequest(requestId: number, body: AnswerDTO) {
    return await this.userRequestService.asnwerRequest(requestId, body.answer);
  }
}
