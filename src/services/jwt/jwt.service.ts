import jwt, {
  SignOptions,
  TokenExpiredError,
  VerifyOptions,
} from 'jsonwebtoken';
import { IUserCookie } from 'src/shared/types';
import { FormFieldError, ServerError } from 'src/utils/error';

export default class JwtService {
  public static tokenizeData(data: any, options?: jwt.SignOptions) {
    return jwt.sign(
      { ...data },
      process.env.JWT_PRIVATE_KEY,
      typeof data === 'string' ? {} : options || { expiresIn: '1d' },
    );
  }

  public static deTokenizData<T>(
    encryptedString: string,
    options?: VerifyOptions,
  ) {
    try {
      const verfied = jwt.verify(
        encryptedString,
        process.env.JWT_PRIVATE_KEY,
        options,
      );
      return verfied as T;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return false;
      }
      console.log(error);
      throw new ServerError();
    }
  }

  public static getUserCookieFromTokens<T>(
    token: string,
    refreshToken: string,
  ): T {
    const tokenDecr = this.deTokenizData<T>(token);
    const refreshDecr = this.deTokenizData<T>(refreshToken);

    let userData: T = tokenDecr ? tokenDecr : refreshDecr ? refreshDecr : null;

    if (!userData) return;

    return userData;
  }
}
