import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminOnly } from './common/decorators/role.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("test")
 @AdminOnly()
  getHello(): string {
    return this.appService.getHello();
  }
}
