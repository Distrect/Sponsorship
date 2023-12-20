import {
  Controller,
  Post,
  Get,
  Delete,
  Patch,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { IUserCookie } from 'src/shared/types';
import {
  EditNeedDTO,
  CreateNeedDTO,
} from 'src/modules/donationModule/childNeed/childNeed.module.interface';
import ChildNeedService from 'src/modules/donationModule/childNeed/childNeed.service';

@UseGuards(new RoleGuard(Role.Authority))
@Controller('authority/needManagement')
export default class NeedManagmentRouteController {
  private childNeedService: ChildNeedService;

  @Get('/getNeedGroup/:childId')
  public async GetNeedGroup(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const data = await this.childNeedService.getChildNeedsData(
      authority,
      childId,
    );

    return { ok: true, result: data };
  }

  @Post('createNeed/:childId')
  public async CreateNeed(
    @Param('childId', ParseIntPipe) childId: number,
    @User(Role.Authority) user: IUserCookie,
    requestBody: CreateNeedDTO,
  ) {
    const result = await this.childNeedService.createNeeds(
      childId,
      user,
      requestBody,
    );

    return {
      ok: true,
      message: 'The Child Needs hsa been created',
      needs: result,
    };
  }

  @Patch(':childId/editNeed/:needGroupId')
  public async EditNeed(
    @Param('needGroupId', ParseIntPipe) needGroupId: number,
    @Param('childId', ParseIntPipe) childId: number,
    requestBody: EditNeedDTO,
  ) {
    const updatedNeeds = await this.childNeedService.editNeed(
      needGroupId,
      requestBody.editedNeeds,
      childId,
    );

    return {
      ok: true,
      message: 'Child Needs Succesfully Updated',
      updatedNeeds,
    };
  }

  @Delete(':childId/deleteNeed/:needId')
  public async DeleteNeed(
    @Param('needId', ParseIntPipe) childNeedId: number,
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    const deletedNeed = await this.childNeedService.deleteNeed(
      childNeedId,
      childId,
    );

    return {
      ok: true,
      message: 'The Child Need Succesfully Deleted',
      deletedNeed,
    };
  }

  public async GetNeeds() {}
}
