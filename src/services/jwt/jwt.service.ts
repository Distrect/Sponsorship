import jwt, {
  SignOptions,
  TokenExpiredError,
  VerifyOptions,
} from 'jsonwebtoken';
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
}
