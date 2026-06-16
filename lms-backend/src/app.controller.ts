import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AdminOnly } from './common/decorators/role.decorator';
import { Public } from './common/decorators/public.decorator';

@Controller()
@Public()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('test')
    @AdminOnly()
    getHello(): string {
        return this.appService.getHello();
    }
}
