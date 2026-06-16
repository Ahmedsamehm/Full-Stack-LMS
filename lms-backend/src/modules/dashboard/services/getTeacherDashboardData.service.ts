import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CourseStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class GetTeacherDashboardDataService {
    constructor(private readonly prisma: PrismaService) {}

    async getTeacherDashboardData(teacherId: string) {
        const now = new Date();

        // Boundaries for current month
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfCurrentMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

        // Boundaries for last month
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

        // Fetching all metrics concurrently
        const [totalCourses, newCourses, totalStudents, currentMonthEnrollments, lastMonthEnrollments, currentMonthEarningsObj, lastMonthEarningsObj, teacherCourses, pendingRequests] =
            await Promise.all([
                // 1. Total courses owned by teacher
                this.prisma.course.count({
                    where: { teacherId },
                }),

                // 2. New courses this month
                this.prisma.course.count({
                    where: {
                        teacherId,
                        createdAt: {
                            gte: startOfCurrentMonth,
                            lte: endOfCurrentMonth,
                        },
                    },
                }),

                // 3. Total unique students enrolled in teacher's courses
                this.prisma.user.count({
                    where: {
                        enrollments: {
                            some: {
                                course: {
                                    teacherId,
                                },
                            },
                        },
                    },
                }),

                // 4. Current month enrollment growth
                this.prisma.enrollment.count({
                    where: {
                        course: { teacherId },
                        enrolledAt: {
                            gte: startOfCurrentMonth,
                            lte: endOfCurrentMonth,
                        },
                    },
                }),

                // 5. Last month enrollment growth
                this.prisma.enrollment.count({
                    where: {
                        course: { teacherId },
                        enrolledAt: {
                            gte: startOfLastMonth,
                            lte: endOfLastMonth,
                        },
                    },
                }),

                // 6. Current month earnings
                this.prisma.payment.aggregate({
                    _sum: { amount: true },
                    where: {
                        status: PaymentStatus.SUCCESS,
                        course: { teacherId },
                        createdAt: {
                            gte: startOfCurrentMonth,
                            lte: endOfCurrentMonth,
                        },
                    },
                }),

                // 7. Last month earnings
                this.prisma.payment.aggregate({
                    _sum: { amount: true },
                    where: {
                        status: PaymentStatus.SUCCESS,
                        course: { teacherId },
                        createdAt: {
                            gte: startOfLastMonth,
                            lte: endOfLastMonth,
                        },
                    },
                }),

                // 8. Teacher courses
                this.prisma.course.findMany({
                    where: { teacherId },
                    orderBy: { updatedAt: 'desc' },
                    include: {
                        _count: {
                            select: { enrollments: true },
                        },
                    },
                }),

                // 9. Teacher pending requests
                this.prisma.request.findMany({
                    where: {
                        status: 'PENDING',
                        course: { teacherId },
                    },
                    include: {
                        requester: true,
                        course: true,
                    },
                    orderBy: { createdAt: 'desc' },
                }),
            ]);

        const monthlyEarnings = currentMonthEarningsObj._sum.amount || 0;
        const lastMonthEarnings = lastMonthEarningsObj._sum.amount || 0;

        // Calculate studentGrowth
        let studentGrowth = '0%';
        if (lastMonthEnrollments === 0) {
            studentGrowth = currentMonthEnrollments > 0 ? `+${currentMonthEnrollments * 100}%` : '0%';
        } else {
            const change = ((currentMonthEnrollments - lastMonthEnrollments) / lastMonthEnrollments) * 100;
            studentGrowth = `${change >= 0 ? '+' : ''}${change.toFixed(0)}%`;
        }

        // Calculate earningsGrowth
        let earningsGrowth = '0.0%';
        if (lastMonthEarnings === 0) {
            earningsGrowth = monthlyEarnings > 0 ? '+100.0%' : '0.0%';
        } else {
            const change = ((monthlyEarnings - lastMonthEarnings) / lastMonthEarnings) * 100;
            earningsGrowth = `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
        }

        // Map teacher courses
        const courses = teacherCourses.map((c) => ({
            id: c.id,
            title: c.title,
            code: c.id.slice(0, 6).toUpperCase(),
            description: c.description,
            price: c.price,
            categoryId: c.categoryId,
            status: c.status === CourseStatus.PUBLISHED ? 'published' : c.status === CourseStatus.DRAFT ? 'draft' : 'archived',
            students: c._count.enrollments,
            lastUpdated: this.formatRelativeTime(c.updatedAt),
        }));

        // Map teacher pending requests
        const mappedRequests = pendingRequests.map((r) => ({
            id: r.id,
            studentName: r.requester.name,
            studentInitials: r.requester.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase(),
            time: this.formatRelativeTime(r.createdAt),
            description: `${r.type === 'PUBLISH_COURSE' ? 'Requested course publication approval' : 'Requested course deletion approval'} for course: "${r.course.title}"`,
            actionLabel: 'Review',
        }));

        return {
            stats: {
                totalCourses,
                newCourses,
                totalStudents,
                studentGrowth,
                monthlyEarnings,
                earningsGrowth,
            },
            courses,
            pendingRequests: mappedRequests,
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
