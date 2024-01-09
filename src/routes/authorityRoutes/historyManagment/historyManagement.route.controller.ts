import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'src/shared/types';
import { HistoryDTO } from 'src/routes/authorityRoutes/historyManagment/historyManagement.route.interface';
import HistoryManagementRouteService from 'src/routes/authorityRoutes/historyManagment/historyManagement.route.service';
import { CookieInterceptor } from 'src/middlewares/cookie/cookie.middleware';

@Controller('authority/historyManagement')
@UseInterceptors(new CookieInterceptor(Role.Authority))
export default class HistoryManagementRouteController {
  constructor(
    private historyManagementRouteService: HistoryManagementRouteService,
  ) {}

  @Post('listHistory/:page')
  public async ListPaymentHistory(
    @Param('page', ParseIntPipe) page: number,
    @Body() requestBody: HistoryDTO,
    @User(Role.Authority) authority: IUserCookie,
  ) {
    const result = await this.historyManagementRouteService.listHistory(
      authority,
      requestBody,
      page,
    );

    return { ok: true, message: 'Payment History Retrieved', result };
  }

  public async ListSponsorshipHistory() {}
}
