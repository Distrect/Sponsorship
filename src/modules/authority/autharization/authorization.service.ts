import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { AuthorityEntityService } from 'src/database/user/authority/authority.service';
import { AuthorityLoginBody } from 'src/modules/authority/autharization/authorization.dto';
import { FormFieldError } from 'src/utils/error';
import { cryptor } from 'src/utils/util';

@Injectable()
export class AuthorityAuthorizationService {
  private authorityEntityService: AuthorityEntityService;

  public async loginAuthority({ email, password }: AuthorityLoginBody) {
    const authorityUser = await this.authorityEntityService.getAuthority({
      email,
    });

    if (!authorityUser)
      throw new HttpException('Authority not found', HttpStatus.NOT_FOUND);

    const decryptedPassword = await cryptor(authorityUser.password, 'decrypt');

    if (password !== decryptedPassword)
      throw new FormFieldError('Password is incorrect', [
        { field: 'password', errorMessage: 'Password is incorrect' },
      ]);

    return authorityUser.toJSON();
  }
}
