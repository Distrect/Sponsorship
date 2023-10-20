import ChildEntityService from 'src/database/user/child/child.service';
import { Injectable } from '@nestjs/common';
import { CreateChildDto } from 'src/modules/authority/childOps/childOps.dto';
import { ActorType, IAuthority, NationalityEnum } from 'src/database/user';
import FileService from 'src/services/file/file.service';

@Injectable()
export default class ChildOpsService {
  private childEntityService: ChildEntityService;

  public async createChild(
    body: CreateChildDto,
    user: IAuthority,
    file: Express.Multer.File,
  ) {
    const createdChild = await this.childEntityService.createChild({
      ...body,
      city: user.city,
    });

    if (file && body.identification) {
      const filePath = FileService.saveFile(
        file,
        'identification',
        createdChild,
      );
    }
  }
}
