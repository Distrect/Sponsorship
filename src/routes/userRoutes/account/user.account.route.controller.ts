import {
  Post,
  Body,
  Controller,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  UserIDImages,
  UserRegisterDTO,
} from 'src/routes/userRoutes/account/user.account.route.dto';
import UserAccountRouteService from 'src/routes/userRoutes/account/user.account.route.service';

@Controller('user/account')
export default class UserAccountRouteController {
  constructor(
    private readonly userAccountRouteService: UserAccountRouteService,
  ) {}
  @Post('/register')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'frontId', maxCount: 1 },
      { name: 'backId', maxCount: 1 },
    ]),
  )
  public async Register(
    @UploadedFiles() idImages: UserIDImages,
    @Body() requestBody: UserRegisterDTO,
  ) {
    requestBody.dateOfBirth = new Date(requestBody.dateOfBirth);

    await this.userAccountRouteService.register(requestBody, idImages);

    return {
      ok: true,
      message:
        'Your regiester request has ben created. When accepted, mail will be send to your email',
    };
  }
}
