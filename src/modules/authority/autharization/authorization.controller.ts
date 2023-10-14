import { Controller, Post, Body } from '@nestjs/common';
import { AuthorityLoginBody } from 'src/modules/authority/autharization/authorization.dto';

@Controller('authority')
export class AuthorityAuthorizationController {
  constructor() {}

  @Post('/login')
  public async Login(@Body() requestBody: AuthorityLoginBody) {}
}
