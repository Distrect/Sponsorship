import {
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Controller,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ChildPagination,
  CreateChildDto,
  UpdateChildDto,
} from 'src/modules/authority/childOps/childOps.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from 'src/database/user';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import ChildOpsService from 'src/modules/authority/childOps/childOps.service';
import { IUserCookie } from 'src/shared/types';

@UseGuards(new RoleGuard(Role.Authority))
@Controller('childops')
export default class ChildOpsController {
  private childOpsService: ChildOpsService;

  @Post('createChild')
  @UseInterceptors(FileInterceptor('file'))
  public async CreateChild(
    @User(Role.Authority) authority: IUserCookie,
    @Body() requestBody: CreateChildDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newChild = await this.childOpsService.createChild(
      requestBody,
      authority,
      file,
    );

    return { ok: true, message: 'Child has been created', newChild };
  }

  @Delete('deleteChild/:childId')
  public async DeleteChild(@Param('childId', ParseIntPipe) childId: number) {
    const deletedChild = await this.childOpsService.deleteChild(childId);

    return {
      ok: true,
      message: 'The Child Successfully Deleted',
      deletedChild,
    };
  }

  @Patch('updateChild/:childId')
  public async UpdateChild(
    @Body() requestBody: UpdateChildDto,
    @Param('childId', ParseIntPipe) childId: number,
  ) {
    const updatedChild = await this.childOpsService.updateChild(
      childId,
      requestBody,
    );

    return { ok: true, message: 'The Child is Updated', updatedChild };
  }

  @Post('listChilds')
  public async ListChilds(@Body() requestBody: ChildPagination): Promise<any> {
    const result = await this.childOpsService.listChilds(requestBody);

    return {
      ok: true,
      message: 'Child List has been successfully retrieved',
      ...result,
    };
  }
}
