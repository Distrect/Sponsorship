import { Controller } from '@nestjs/common';
import ChildManagementRouteService from 'src/routes/authorityRoutes/childManagement/childManagement.route.service';

@Controller('authority/childManagement')
export default class ChildManagementRouteController {
  constructor(
    private childManagementRouteService: ChildManagementRouteService,
  ) {}
}
