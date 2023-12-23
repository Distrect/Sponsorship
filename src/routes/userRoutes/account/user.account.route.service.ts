import { Injectable } from '@nestjs/common';
import { NationalityEnum, Role } from 'src/database/user';
import UserService from 'src/modules/userModule/userModule/user.service';
import {
  UserIDImages,
  UserRegisterDTO,
} from 'src/routes/userRoutes/account/user.account.route.dto';
import { LoginDto } from 'src/shared/dtos';

@Injectable()
export default class UserAccountRouteService {
  constructor(private userService: UserService) {}

  public async login(body: LoginDto) {
    const user = await this.userService.logIn(body, Role.User);

    return user;
  }

  public async register(body: UserRegisterDTO, idImages: UserIDImages) {
    const user = await this.userService.register({
      identifications: [
        {
          idNumber: body.idNumber,
          nationality: NationalityEnum.KKTC,
          files: idImages,
        },
      ],
      ...body,
    });
  }
}
