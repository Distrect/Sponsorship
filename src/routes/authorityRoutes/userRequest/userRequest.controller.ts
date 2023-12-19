import {
  Controller,
  Query,
  Get,
  ParseIntPipe,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'src/shared/types';
import UserRequestRouteService from 'src/routes/authorityRoutes/userRequest/userRequest.route.service';
import { AnswerDTO } from 'src/routes/authorityRoutes/userRequest/userRequest.route.dto';

@Controller('authority/request')
export default class UserRequestController {
  constructor(private userRequestRouteService: UserRequestRouteService) {}

  @Get('/getrequests')
  public async GetRequests(
    @User(Role.Authority) authority: IUserCookie,
    @Query('page', ParseIntPipe) page: number,
  ) {
    const requests = await this.userRequestRouteService.getRequests(
      authority,
      page,
    );

    return {
      ok: true,
      message: 'User Requests Successfully Returned',
      requests,
    };
  }

  @Post('/answer/:requestId')
  public async AnswerRequest(
    @Param('requestId', ParseIntPipe) requestId: number,
    @Body() requestBody: AnswerDTO,
  ) {
    const userRequest = await this.userRequestRouteService.answerRequest(
      requestId,
      requestBody,
    );

    return {
      ok: true,
      message: 'Answer Succesfully saved',
      userRequest,
    };
  }
}
