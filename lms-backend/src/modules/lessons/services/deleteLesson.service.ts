import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { Roles } from '@prisma/client';

@Injectable()
export class DeleteLessonService {
    constructor(private readonly prisma: PrismaService) {}

    async delete(courseId: string, lessonId: string, userId: string, userRole: Roles): Promise<{ message: string }> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const lesson = await this.prisma.lesson.findFirst({ where: { id: lessonId, courseId } });

        if (!lesson) {
            throw new NotFoundException('Lesson not found');
        }

        await this.prisma.lesson.delete({ where: { id: lessonId } });

        await this.prisma.lesson.updateMany({
            where: {
                courseId,
                orderIndex: { gt: lesson.orderIndex },
            },
            data: {
                orderIndex: { decrement: 1 },
            },
        });

        return { message: 'Lesson deleted successfully' };
    }

    private async findCourseWithOwnership(courseId: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.prisma.course.findUnique({ where: { id: courseId } });
        }
        return this.prisma.course.findFirst({ where: { id: courseId, teacherId: userId } });
    }
}
