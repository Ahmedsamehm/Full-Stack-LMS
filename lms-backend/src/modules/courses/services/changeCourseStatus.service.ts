import { BadRequestException, Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CourseStatus, Roles } from '@prisma/client';
import { CourseResponseDto } from '../dto/response-course.dto';

@Injectable()
export class ChangeCourseStatusService {
    constructor(private readonly prisma: PrismaService) {}

    async changeStatus(courseId: string, newStatus: CourseStatus, userId: string, userRole: Roles): Promise<CourseResponseDto> {
        let course;

        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            course = await this.prisma.course.findUnique({ where: { id: courseId } });
        } else {
            course = await this.prisma.course.findFirst({ where: { id: courseId, teacherId: userId } });
        }

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (userRole !== Roles.Super_Admin && userRole !== Roles.Admin) {
            const ownedCourse = await this.prisma.course.findFirst({ where: { id: courseId, teacherId: userId } });
            if (!ownedCourse) {
                throw new ForbiddenException('You can only change status of your own courses');
            }
        }

        const validStatuses: CourseStatus[] = ['DRAFT', 'PENDING', 'PUBLISHED', 'REJECTED'];

        if (!validStatuses.includes(newStatus)) {
            throw new BadRequestException('Invalid status');
        }

        const updated = await this.prisma.course.update({
            where: { id: courseId },
            data: { status: newStatus },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                categoryId: true,
                thumbnailUrl: true,
                teacherId: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updated;
    }
}
