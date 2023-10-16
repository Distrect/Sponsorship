import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './../../../services/auth/auth.service';
import { AuthorityLoginBody } from 'src/modules/authority/autharization/authorization.dto';
import { AuthorityAuthorizationService } from 'src/modules/authority/autharization/authorization.service';
import { Response } from 'express';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { Role } from 'src/database/user';

@Controller('authority')
export class AuthorityAuthorizationController {
  constructor(
    public authorizationService: AuthorityAuthorizationService,
    private authService: AuthService,
  ) {}

  @Post('/login')
  public async Login(
    @Res({ passthrough: true }) res: Response,
    @Body() requestBody: AuthorityLoginBody,
  ) {
    const authorityUser =
      await this.authorizationService.loginAuthority(requestBody);

    const hashedAuthorityUser =
      await this.authService.tokenizeData(authorityUser);

    res.cookie('AuthorityAuthorization', hashedAuthorityUser);

    return { ok: true, message: 'Authentication Successful' };
  }
  @UseGuards(new RoleGuard(Role.Authority))
  @Post('/logout')
  public async Logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('authorityAuthentication');
    return { ok: true, message: 'Successfluuy loged out' };
  }
}
