import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { GetAdminDashboardDataService } from './services/getAdminDashboardData.service';
import { GetTeacherDashboardDataService } from './services/getTeacherDashboardData.service';

@Module({
    controllers: [DashboardController],
    providers: [DashboardService, GetAdminDashboardDataService, GetTeacherDashboardDataService],
})
export class DashboardModule {}
