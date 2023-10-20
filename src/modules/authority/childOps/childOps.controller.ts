import {
  Controller,
  UseGuards,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { IAuthority, Role } from 'src/database/user';
import { RoleGuard } from 'src/guards/userAuthentication.guard';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { CreateChildDto } from 'src/modules/authority/childOps/childOps.dto';
import ChildOpsService from 'src/modules/authority/childOps/childOps.service';

@UseGuards(new RoleGuard(Role.Authority))
@Controller('childops')
export default class ChildOpsController {
  private childOpsService: ChildOpsService;

  @Post('createChild')
  @UseInterceptors(FileInterceptor('file'))
  public async CreateChild(
    @User(Role.Authority) authority: IAuthority,
    @Body() requestBody: CreateChildDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.childOpsService.createChild(
      requestBody,
      authority,
      file,
    );
  }
}
