import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TeacherOnly } from '../../common/decorators/role.decorator';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { UserResponseDto } from '../../core/auth/dto/response-auth.dto';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('data')
    @TeacherOnly()
    @ResponseMessage('Dashboard data retrieved successfully')
    @HttpCode(HttpStatus.OK)
    async getDashboardData(@CurrentUser() user: UserResponseDto) {
        return this.dashboardService.getDashboardData(user.id, user.role);
    }
}
