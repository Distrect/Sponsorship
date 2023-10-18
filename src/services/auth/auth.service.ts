import jwt, {
  SignOptions,
  TokenExpiredError,
  VerifyCallback,
  VerifyOptions,
} from 'jsonwebtoken';
import { ServerError } from 'src/utils/error';

export class AuthService {
  private static secretKey: string = process.env.JWT_SECRET_KEY;

  public static tokenizeData(data: any, options?: SignOptions) {
    return jwt.sign(data, this.secretKey, options || { expiresIn: '1d' });
  }

  public static deTokenizData<>(
    encryptedString: string,
    options?: VerifyOptions,
  ) {
    try {
      const verfied = jwt.verify(encryptedString, this.secretKey, options);
      return verfied;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return false;
      }
      console.log(error);
      throw new ServerError();
    }
  }
}
