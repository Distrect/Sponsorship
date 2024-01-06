import { Controller, Get } from '@nestjs/common';
import { Role } from 'src/database/user';
import { User } from 'src/middlewares/cookie/cookie.decorator';
import { IUserCookie } from 'src/shared/types';
import ChildMessageRotueService from 'src/routes/childRoutes/message/childMessage.route.service';

@Controller('child/message')
export default class ChildMessageRouteController {
  constructor(private childMessageRouteService: ChildMessageRotueService) {}

  @Get('getConversations')
  public async GetChildConversations(@User(Role.Child) child: IUserCookie) {
    const conversations =
      await this.childMessageRouteService.getConversations(child);

    return { ok: true, mesage: 'Retrieved child conversations', conversations };
  }
}
