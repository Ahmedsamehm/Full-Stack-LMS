import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { Roles, CourseStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class GetAdminDashboardDataService {
    constructor(private readonly prisma: PrismaService) {}

    async getAdminDashboardData() {
        const now = new Date();

        // Boundaries for current month
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // Boundaries for last month
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

        // 12 months ago boundary for chart
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
        twelveMonthsAgo.setDate(1);
        twelveMonthsAgo.setHours(0, 0, 0, 0);

        // Fetching all metrics and database lists concurrently
        const [
            activeUsers,
            totalTeachers,
            approvalQueue,
            currentMonthRevenueObj,
            lastMonthRevenueObj,
            currentMonthNewUsers,
            lastMonthNewUsers,
            currentMonthNewTeachers,
            lastMonthNewTeachers,
            pendingCourses,
            recentPayments,
            recentEnrollments,
            recentPublishedCourses,
            last12MonthsPayments,
        ] = await Promise.all([
            // 1. Total users on the platform
            this.prisma.user.count(),

            // 2. Total teachers
            this.prisma.user.count({
                where: { role: Roles.Teacher },
            }),

            // 3. Count courses in approval queue (PENDING status)
            this.prisma.course.count({
                where: { status: CourseStatus.PENDING },
            }),

            // 4. Current month revenue
            this.prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    status: PaymentStatus.SUCCESS,
                    createdAt: {
                        gte: startOfCurrentMonth,
                        lte: endOfCurrentMonth,
                    },
                },
            }),

            // 5. Last month revenue
            this.prisma.payment.aggregate({
                _sum: { amount: true },
                where: {
                    status: PaymentStatus.SUCCESS,
                    createdAt: {
                        gte: startOfLastMonth,
                        lte: endOfLastMonth,
                    },
                },
            }),

            // 6. Current month new users (registrations)
            this.prisma.user.count({
                where: {
                    createdAt: {
                        gte: startOfCurrentMonth,
                        lte: endOfCurrentMonth,
                    },
                },
            }),

            // 7. Last month new users (registrations)
            this.prisma.user.count({
                where: {
                    createdAt: {
                        gte: startOfLastMonth,
                        lte: endOfLastMonth,
                    },
                },
            }),

            // 8. Current month new teachers
            this.prisma.user.count({
                where: {
                    role: Roles.Teacher,
                    createdAt: {
                        gte: startOfCurrentMonth,
                        lte: endOfCurrentMonth,
                    },
                },
            }),

            // 9. Last month new teachers
            this.prisma.user.count({
                where: {
                    role: Roles.Teacher,
                    createdAt: {
                        gte: startOfLastMonth,
                        lte: endOfLastMonth,
                    },
                },
            }),

            // 10. Courses waiting for approval (PENDING status)
            this.prisma.course.findMany({
                where: { status: CourseStatus.PENDING },
                orderBy: { createdAt: 'desc' },
                take: 5,
                include: {
                    teacher: true,
                    category: true,
                },
            }),

            // 11. Recent payments for activity feed
            this.prisma.payment.findMany({
                where: { status: PaymentStatus.SUCCESS },
                orderBy: { createdAt: 'desc' },
                take: 3,
                include: {
                    user: true,
                    course: true,
                },
            }),

            // 12. Recent enrollments for activity feed
            this.prisma.enrollment.findMany({
                orderBy: { enrolledAt: 'desc' },
                take: 3,
                include: {
                    user: true,
                    course: true,
                },
            }),

            // 13. Recent published courses for activity feed
            this.prisma.course.findMany({
                where: { status: CourseStatus.PUBLISHED },
                orderBy: { createdAt: 'desc' },
                take: 3,
                include: {
                    teacher: true,
                },
            }),

            // 14. Successful payments in the last 12 months for chart data
            this.prisma.payment.findMany({
                where: {
                    status: PaymentStatus.SUCCESS,
                    createdAt: { gte: twelveMonthsAgo },
                },
                select: {
                    amount: true,
                    createdAt: true,
                },
            }),
        ]);

        const monthlyRevenue = currentMonthRevenueObj._sum.amount || 0;
        const lastMonthRevenue = lastMonthRevenueObj._sum.amount || 0;

        // Calculate activeUsersChange
        let activeUsersChange = '0% this month';
        if (lastMonthNewUsers === 0) {
            activeUsersChange = currentMonthNewUsers > 0 ? `+${currentMonthNewUsers * 100}% this month` : '0% this month';
        } else {
            const change = ((currentMonthNewUsers - lastMonthNewUsers) / lastMonthNewUsers) * 100;
            activeUsersChange = `${change >= 0 ? '+' : ''}${change.toFixed(0)}% this month`;
        }

        // Calculate teachersTrend
        let teachersTrend = 'Steady';
        if (currentMonthNewTeachers !== lastMonthNewTeachers) {
            if (lastMonthNewTeachers === 0) {
                teachersTrend = `+${currentMonthNewTeachers * 100}%`;
            } else {
                const change = ((currentMonthNewTeachers - lastMonthNewTeachers) / lastMonthNewTeachers) * 100;
                teachersTrend = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
            }
        }

        // Calculate revenueChange
        let revenueChange = '0.0% vs last month';
        if (lastMonthRevenue === 0) {
            revenueChange = monthlyRevenue > 0 ? '+100.0% vs last month' : '0.0% vs last month';
        } else {
            const change = ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100;
            revenueChange = `${change >= 0 ? '+' : ''}${change.toFixed(1)}% vs last month`;
        }

        // Map course approvals
        const approvals = pendingCourses.map((course) => ({
            id: course.id,
            courseTitle: course.title,
            instructorName: course.teacher.name,
            instructorInitials: course.teacher.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            category: course.category.name,
            submittedAgo: `Submitted ${course.createdAt.toLocaleDateString()}`,
        }));

        // Construct dynamic activity log
        const activityList: { date: Date; type: 'payments' | 'school' | 'person_add'; details: any }[] = [];

        for (const p of recentPayments) {
            activityList.push({
                date: p.createdAt,
                type: 'payments',
                details: {
                    userName: p.user.name,
                    courseTitle: p.course.title,
                    amount: p.amount,
                },
            });
        }
        for (const e of recentEnrollments) {
            activityList.push({
                date: e.enrolledAt,
                type: 'school',
                details: {
                    userName: e.user.name,
                    courseTitle: e.course.title,
                },
            });
        }
        for (const c of recentPublishedCourses) {
            activityList.push({
                date: c.createdAt,
                type: 'person_add',
                details: {
                    teacherName: c.teacher.name,
                    courseTitle: c.title,
                },
            });
        }

        // Sort descending by date
        activityList.sort((a, b) => b.date.getTime() - a.date.getTime());

        // Take top 4 activities
        const activities = activityList.slice(0, 4).map((act, index, arr) => ({
            id: `act-${index}`,
            type: act.type,
            details: act.details,
            time: this.formatRelativeTime(act.date),
            isLast: index === arr.length - 1,
        }));

        // Aggregate last 12 months payments for chart data
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthData: { month: string; year: number; revenue: number }[] = [];

        for (let i = 11; i >= 0; i--) {
            const d = new Date();
            d.setMonth(now.getMonth() - i);
            monthData.push({
                month: months[d.getMonth()],
                year: d.getFullYear(),
                revenue: 0,
            });
        }

        for (const payment of last12MonthsPayments) {
            const payDate = new Date(payment.createdAt);
            const mName = months[payDate.getMonth()];
            const yNum = payDate.getFullYear();

            const match = monthData.find((m) => m.month === mName && m.year === yNum);
            if (match) {
                match.revenue += payment.amount;
            }
        }

        const revenueData = monthData.map((m) => ({
            month: m.month,
            revenue: m.revenue,
        }));

        return {
            stats: {
                activeUsers,
                totalTeachers,
                monthlyRevenue,
                approvalQueue,
                activeUsersChange,
                teachersTrend,
                revenueChange,
            },
            approvals,
            activities,
            revenueData,
        };
    }

    private formatRelativeTime(date: Date): string {
        const diffMs = new Date().getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays === 1) return 'Yesterday';
        return date.toLocaleDateString();
    }
}
