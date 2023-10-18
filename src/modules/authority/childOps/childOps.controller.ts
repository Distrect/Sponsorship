import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { Role } from 'src/database/user';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { CreateChildDto } from 'src/modules/authority/childOps/childOps.dto';

@UseGuards(new RoleGuard(Role.Authority))
@Controller('childops')
export default class ChildOpsController {
  constructor() {}

  @Post('createChild')
  public CreateChild(@Body() requestBody: CreateChildDto) {}
}
