import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { FormFieldError, NotFound } from './../../../utils/error';
import { Role } from 'src/database/user';
import {
  ILogInCredentials,
  RoleEntity,
} from 'src/modules/userModule/userModule/user.types';
import {
  IIdentification,
  IRegisterUser,
} from 'src/modules/userModule/userModule/types';
import AuthorityDao from 'src/database/user/authority/authority.dao';
import ChildDao from 'src/database/user/child/child.dao';
import UserDao from 'src/database/user/user/user.dao';
import JwtService from 'src/services/jwt/jwt.service';
import BaseUser from 'src/database/user/baseUser';
import moment from 'moment';
import User from 'src/database/user/user/user.entity';
import IdentificationDao from 'src/database/user/identification/identification.dao';
import FileService from 'src/services/file/file.service';
import UserRequestDao from 'src/database/user/userRequest/userRequest.dao';

@Injectable()
export default class UserService {
  constructor(
    private authorityDao: AuthorityDao,
    private userDao: UserDao,
    private childDao: ChildDao,
    private userRequestDao: UserRequestDao,
    private identificationDao: IdentificationDao,
    private fileService: FileService,
  ) {}

  public clearPrivateData({ password, isDeleted, ...rest }: BaseUser) {
    return rest;
  }

  private isTCKNValid(tckn: string): boolean {
    if (!/^\d{11}$/.test(tckn)) {
      return false;
    }

    const digits = tckn.split('').map(Number);

    const firstSum =
      digits.slice(0, 5).reduce((sum, digit) => sum + digit, 0) * 7;
    const secondSum = digits
      .slice(5, 10)
      .reduce((sum, digit) => sum + digit, 0);
    const tenthDigitCheck = (firstSum - secondSum) % 10;

    if (digits[9] !== tenthDigitCheck) {
      return false;
    }

    const eleventhDigitCheck =
      digits.slice(0, 10).reduce((sum, digit) => sum + digit, 0) % 10;

    return digits[10] === eleventhDigitCheck;
  }

  private checkAge(birthDate: Date) {
    const today = moment();
    const age = Math.floor(today.diff(birthDate, 'days') / 365);

    return age >= 18 ? true : false;
  }

  private checkIdentifications(identifications: IIdentification[]) {
    identifications.forEach((idetf) => {
      if (idetf.idNumber.length !== 10)
        throw new FormFieldError('ID number is not correct', [
          { field: 'idNumber', errorMessage: 'Failed' },
        ]);
    });
    /*
    const formFieldError = new FormFieldError(
      'Id Number(s) is/are invalid',
      [],
    );

    identifications.forEach((idf) => {
      const isTrue = this.isTCKNValid(idf.idNumber);

      if (!isTrue) {
        formFieldError.fields.push({
          errorMessage: `${idf.nationality} number is invalid`,
          field: `${idf.nationality}number`,
        });
      }
    });

    if (formFieldError.fields.length === 0) {
      throw formFieldError;
    }*/
  }

  private async cryptor(
    value: string,
    mode: 'encrypt' | 'decrypt' = 'encrypt',
  ): Promise<string> {
    const jwt = await import('jsonwebtoken');
    const secretKey = process.env['JWT_PRIVATE_KEY'];

    if (mode === 'encrypt') {
      return jwt.sign(value, secretKey, {
        expiresIn: 150 * 365 * 24 * 60 * 60 * 1000,
      });
    }

    return jwt.verify(value, secretKey, { ignoreExpiration: true }) as string;
  }

  public createCookieData(user: BaseUser): [string, string] {
    const token = JwtService.tokenizeData(user);
    const refreshToken = JwtService.tokenizeData(user, { expiresIn: '2d' });

    return [token, refreshToken];
  }

  public async getUser<T extends Role>(
    userParams: FindOptionsWhere<RoleEntity<T>>,
    role: T,
  ): Promise<RoleEntity<T>> {
    if (role === Role.Admin) throw new Error();

    let user: unknown;

    switch (role) {
      case Role.Authority:
        user = await this.authorityDao.getAuthority(userParams);
        break;
      case Role.Child:
        user = await this.childDao.getChild(userParams);
        break;
      case Role.User:
        user = await this.userDao.getUser(userParams);
        break;
      default:
        throw new Error('MİNİ TERORİSTA');
    }

    return user as unknown as RoleEntity<T>;
  }

  public async logIn<T extends Role>(
    { email, password }: ILogInCredentials,
    role: T,
  ) {
    const user = await this.getUser(
      { email } as FindOptionsWhere<RoleEntity<T>>,
      role,
    );

    if (user.isDeleted) throw new NotFound('User Not Found');

    if (user instanceof User && !user.canLogin) {
      throw new Error('Baba giremezin');
    }
    const encryptedPassword = await this.cryptor(user.password, 'decrypt');

    if (password !== encryptedPassword) {
      const message = 'Password is incorrect';
      throw new FormFieldError(message, [
        { field: 'password', errorMessage: message },
      ]);
    }

    return user;
  }

  public async createIdentificationFiles(
    identifications: IIdentification[],
    user: User,
  ) {
    identifications.forEach((identification) => {
      identification.files.frontId.forEach((front) =>
        this.fileService.saveFile(
          front,
          'identification',
          user,
          'ID_FRONT_PAGE.jpg',
        ),
      );
      identification.files.backId.forEach((back) =>
        this.fileService.saveFile(
          back,
          'identification',
          user,
          'ID_BACK_PAGE.jpg',
        ),
      );
    });
  }

  public async register({ identifications, ...rest }: IRegisterUser) {
    if (!this.checkAge(rest.dateOfBirth))
      throw new FormFieldError('You should be 18. Get off here kiddo', [
        { errorMessage: 'Should be 18', field: 'birthdate' },
      ]);

    this.checkIdentifications(identifications);

    const user = await this.userDao.createUser(rest);
    this.createIdentificationFiles(identifications, user);
    const userRequest = await this.userRequestDao.createLoginRequest({ user });

    user.loginRequests = [userRequest];

    return user;
  }

  public async resetPassword(email: string) {
    console.log(email);
  }
}
