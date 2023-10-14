import { Controller, Post, Body } from '@nestjs/common';

@Controller('authority')
export class AuthorityAuthorizationController {
  constructor() {}

  @Post('/login')
  public async Login(@Body() requestBody) {}
}
