import { Controller, Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';

import ChildAccountRouteService from 'src/routes/childRoutes/account/child.route.account.service';
import { LoginDto } from 'src/shared/dtos';

@Controller('childAccount')
export default class ChildAccountRouteController {
  constructor(private childAccountService: ChildAccountRouteService) {}

  @Post('/login')
  public async Login(@Res() res: Response, @Body() requestBody: LoginDto) {
    console.log('XxXxXxXxX');
    const result = await this.childAccountService
      .login(requestBody)
      .catch((err) => console.log(err));
    console.log('Result', result);
    return { ok: result };
  }
}
