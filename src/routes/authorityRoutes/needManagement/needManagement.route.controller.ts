import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  HttpException,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'src/shared/types';
import {
  EditNeedDTO,
  CreateNeedDTO,
  EditNeed,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import { CookieInterceptor } from 'src/middlewares/cookie/cookie.middleware';
import NeedManagementRouteService from 'src/routes/authorityRoutes/needManagement/needManagement.route.service';

@UseInterceptors(new CookieInterceptor(Role.Authority))
@Controller('authority/needManagement')
export default class NeedManagmentRouteController {
  constructor(
    private childManagementRouteService: NeedManagementRouteService,
  ) {}

  @Get('/getNeedGroup/:childId')
  public async GetNeedGroup(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const data = await this.childManagementRouteService.getChildNeedsData(
      authority,
      childId,
    );

    return { ok: true, result: data };
  }

  @Post('createNeed/:childId')
  public async CreateNeed(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authotiy: IUserCookie,
    @Body() requestBody: CreateNeedDTO,
  ) {
    console.log(requestBody);
    const result = await this.childManagementRouteService.createNeeds(
      childId,
      authotiy,
      requestBody,
    );

    return {
      ok: true,
      message: 'The Child Needs hsa been created',
      needs: result,
    };
  }

  @Patch('editNeed')
  public async EditNeed(@Body() requestBody: EditNeed) {
    const updatedNeeds =
      await this.childManagementRouteService.editNeed(requestBody);

    return {
      ok: true,
      message: 'Child Needs Succesfully Updated',
      updatedNeeds,
    };
  }

  @Delete('deleteNeed/:needId')
  public async DeleteNeed(@Param('needId', ParseIntPipe) childNeedId: number) {
    const deletedNeed =
      await this.childManagementRouteService.deleteNeed(childNeedId);

    return {
      ok: true,
      message: 'The Child Need Succesfully Deleted',
      deletedNeed,
    };
  }

  public async GetNeeds() {}
}
