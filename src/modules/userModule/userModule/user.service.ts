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
import AdminDao from 'src/database/user/admin/admin.dao';
import AuthorityDao from 'src/database/user/authority/authority.dao';
import ChildDao from 'src/database/user/child/child.dao';
import UserDao from 'src/database/user/user/user.dao';
import JwtService from 'src/services/jwt/jwt.service';
import BaseUser from 'src/database/user/baseUser';
import moment from 'moment';
import User from 'src/database/user/user/user.entity';

@Injectable()
export default class UserService {
  private authorityDao: AuthorityDao;
  private userDao: UserDao;
  private childDao: ChildDao;
  private adminDao: AdminDao;

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
    }
  }

  private async cryptor(
    value: string,
    mode: 'encrypt' | 'decrypt' = 'encrypt',
  ): Promise<string> {
    const jwt = await import('jsonwebtoken');
    const secretKey = process.env['SECRET_HASH_KEY'];

    if (mode === 'encrypt') {
      return jwt.sign(value, secretKey, {
        expiresIn: 150 * 365 * 24 * 60 * 60 * 1000,
      });
    }

    return jwt.verify(value, secretKey, { ignoreExpiration: true }) as string;
  }

  private createCookieData(user: BaseUser) {
    const token = JwtService.tokenizeData(user);
    const refreshToken = JwtService.tokenizeData(user, { expiresIn: '2d' });

    return [token, refreshToken];
  }

  public async getUser<T extends Role>(
    userParams: FindOptionsWhere<RoleEntity<T>>,
    role: T,
  ): Promise<RoleEntity<T>> {
    const daoRole = {
      Admin: this.adminDao.getAdmin,
      Authority: this.authorityDao.getAuthority,
      User: this.userDao.getUser,
      Child: this.childDao.getChild,
    };

    const user = await daoRole[role](userParams);

    return user as unknown as RoleEntity<T>;
  }

  public async logIn<T extends Role>(
    { email, password }: ILogInCredentials,
    role: T,
  ) {
    const user = await this.getUser(
      { email, password } as FindOptionsWhere<RoleEntity<T>>,
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

    return this.createCookieData(user);
  }

  public async register({ identifications, ...rest }: IRegisterUser) {
    if (!this.checkAge(rest.dateOfBirth))
      throw new FormFieldError('You should be 18. Get off here kiddo', [
        { errorMessage: 'Should be 18', field: 'birthdate' },
      ]);

    this.checkIdentifications(identifications);

    const createdUser = await this.userDao.createUser(rest);

    // create login request

    return createdUser;
  }

  public async resetPassword(email: string) {}
}
