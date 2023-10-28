import { Injectable } from '@nestjs/common';
import {
  ChildPagination,
  CreateChildDto,
  UpdateChildDto,
} from 'src/modules/authority/childOps/childOps.dto';
import { ActorType } from 'src/database/user';
import { checkIdentityNo } from 'src/utils/util';
import { FormFieldError } from 'src/utils/error';
import { IUserCookie } from 'src/shared/types';
import IdentificationEntityService from 'src/database/user/identification/identification.service';
import ChildEntityService, {
  IChildListMethod,
} from 'src/database/user/child/child.service';
import FileService from 'src/services/file/file.service';

@Injectable()
export default class ChildOpsService {
  private childEntityService: ChildEntityService;
  private identificationEntityService: IdentificationEntityService;

  public async createChild(
    body: CreateChildDto,
    user: IUserCookie,
    file: Express.Multer.File,
  ) {
    if (body.identification && !checkIdentityNo(body.identification.idNumber))
      throw new FormFieldError('ThE ID Number is not correct', [
        { errorMessage: 'The id number is not valid', field: 'idNumber' },
      ]);

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

      const identification =
        await this.identificationEntityService.createIdentification(
          createdChild,
          { ...body.identification, path: filePath },
          ActorType.CHILD,
        );
      createdChild.identifications = [identification];
    }

    return createdChild;
  }

  public async deleteChild(childId: number) {
    const deletedChild = await this.childEntityService.deleteChild(childId);

    return deletedChild;
  }

  public async updateChild(childId: number, body: UpdateChildDto) {
    const updatedChild = await this.childEntityService.updateChild(
      childId,
      body,
    );

    return updatedChild;
  }

  public async listChilds(body: ChildPagination): Promise<IChildListMethod> {
    const childsAndCount = await this.childEntityService.listChilds(body);
    return childsAndCount;
  }
}
