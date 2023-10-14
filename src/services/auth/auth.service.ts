import { JwtService } from '@nestjs/jwt';

export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async tokenizeData(payload: any): Promise<string> {
    const tokenized = await this.jwtService.signAsync(payload);
    return tokenized;
  }

  public async unTokenizeData<T>(token: string): Promise<T> {
    return (await this.jwtService.verifyAsync(token)) as T;
  }
}
