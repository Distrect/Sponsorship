import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ListChildwithNeedsDTO } from 'src/routes/userRoutes/childInNeed/childInNeed.interface';
import ChildInNeedRouteService from 'src/routes/userRoutes/childInNeed/childInNeed.route.service';

@Controller('user/childsInNeed')
export default class ChildInNeedRouteController {
  constructor(private childInNeedRouteService: ChildInNeedRouteService) {}

  @Post('listChildsWithNeeds/:page')
  public async ListChildWithNeeds(
    @Param('page', ParseIntPipe) page: number,
    @Body() requestBody: ListChildwithNeedsDTO,
  ) {
    const result =
      await this.childInNeedRouteService.listDonatableChildwithNeeds(
        requestBody,
        page,
      );

    return { ok: true, result };
  }
}
