import {
  Get,
  Body,
  Post,
  Param,
  Delete,
  Controller,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { Role } from 'src/database/user';
import { IUserCookie } from 'src/shared/types';
import { EditChildDTO } from 'src/routes/authorityRoutes/childManagement/childManagement.interface';
import { CookieInterceptor } from 'src/middlewares/cookie/cookie.middleware';
import ChildManagementRouteService from 'src/routes/authorityRoutes/childManagement/childManagement.route.service';

@UseInterceptors(new CookieInterceptor(Role.Authority))
@Controller('authority/childManagement')
export default class ChildManagementRouteController {
  constructor(
    private childManagementRouteService: ChildManagementRouteService,
  ) {}

  @Get('getChildCard/:childId')
  public async GetChild(@Param('childId', ParseIntPipe) childId: number) {
    const child = await this.childManagementRouteService.getChildCard(childId);

    return { ok: true, message: 'Child Retrieved', child };
  }

  @Post('editChild/:childId')
  public async EditChild(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authority: IUserCookie,
    @Body() requestBody: EditChildDTO,
  ) {
    const editedChild = await this.childManagementRouteService.editChild(
      authority,
      childId,
      requestBody,
    );

    return { ok: true, message: 'Child is Edited', editedChild };
  }

  @Delete('deleteChild/:childId')
  public async DeleteChild(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const deletedChild = await this.childManagementRouteService.deleteChild(
      childId,
      authority,
    );

    return { ok: true, message: 'Child is deleted', deletedChild };
  }
}
