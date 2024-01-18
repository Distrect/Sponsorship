import {
  Get,
  Post,
  Body,
  Query,
  Param,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'shared/types';
import { AnswerDTO } from 'src/routes/authorityRoutes/userRequest/userRequest.route.dto';
import { CookieInterceptor } from 'src/middlewares/cookie/cookie.middleware';
import UserRequestRouteService from 'src/routes/authorityRoutes/userRequest/userRequest.route.service';

@Controller('authority/request')
@UseInterceptors(new CookieInterceptor(Role.Authority))
export default class UserRequestController {
  constructor(private userRequestRouteService: UserRequestRouteService) {}

  @Get('/getRequests?:page')
  public async GetRequests(
    @User(Role.Authority) authority: IUserCookie,
    @Query('page', ParseIntPipe) page: number = 0,
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
