import { Controller, UseGuards, Post, Body, Param } from '@nestjs/common';
import { IAuthority, Role } from 'src/database/user';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { CreateChildDto } from 'src/modules/authority/childOps/childOps.dto';

@UseGuards(new RoleGuard(Role.Authority))
@Controller('childops')
export default class ChildOpsController {
  constructor() {}

  @Post('createChild')
  public CreateChild(
    @User(Role.Authority) authority: IAuthority,
    @Body() requestBody: CreateChildDto,
  ) {}
}
