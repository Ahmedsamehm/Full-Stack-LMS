import { Injectable, ForbiddenException } from '@nestjs/common';
import { Roles } from '@prisma/client';
import { GetAdminDashboardDataService } from './services/getAdminDashboardData.service';
import { GetTeacherDashboardDataService } from './services/getTeacherDashboardData.service';

@Injectable()
export class DashboardService {
    constructor(
        private readonly getAdminDashboardDataService: GetAdminDashboardDataService,
        private readonly getTeacherDashboardDataService: GetTeacherDashboardDataService,
    ) {}

    async getDashboardData(userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.getAdminDashboardDataService.getAdminDashboardData();
        } else if (userRole === Roles.Teacher) {
            return this.getTeacherDashboardDataService.getTeacherDashboardData(userId);
        } else {
            throw new ForbiddenException('Only teachers and admins can view dashboard data');
        }
    }
}
