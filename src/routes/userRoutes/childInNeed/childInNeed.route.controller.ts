import { Body, Controller, Post } from '@nestjs/common';
import { ListChildwithNeedsDTO } from 'src/routes/userRoutes/childInNeed/childInNeed.interface';
import ChildInNeedRouteService from 'src/routes/userRoutes/childInNeed/childInNeed.route.service';

@Controller('child/chilInNeed')
export default class ChildInNeedRouteController {
  constructor(private childInNeedRouteService: ChildInNeedRouteService) {}

  @Post('listChildWithNeeds')
  public async ListChildWithNeeds(@Body() requestBody: ListChildwithNeedsDTO) {
    const result =
      await this.childInNeedRouteService.listDonatableChildwithNeeds(
        requestBody,
      );
  }
}
