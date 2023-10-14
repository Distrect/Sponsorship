import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class AuthorityLoginBody {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Email is wrong' })
  public email: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password should be at least 8 charachters' })
  public password: string;
}
