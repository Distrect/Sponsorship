import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { LoginDto } from 'src/shared/dtos';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post('/')
  async getHello(@Body() body: LoginDto) {
    const deneme = await this.appService.getHello();
    return { ok: true };
  }
}
