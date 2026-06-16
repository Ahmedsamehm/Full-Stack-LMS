import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { LessonResponseDto } from '../dto/response-lesson.dto';
import { Roles } from '@prisma/client';
import { lessonSelect } from '../../../common/selects/lesson.select';

@Injectable()
export class GetLessonsByCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async findByCourseId(courseId: string, userId: string, userRole: Roles): Promise<LessonResponseDto[]> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return this.prisma.lesson.findMany({
            where: { courseId },
            orderBy: { orderIndex: 'asc' },
            select: lessonSelect,
        });
    }

    private async findCourseWithOwnership(courseId: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.prisma.course.findUnique({ where: { id: courseId } });
        }
        return this.prisma.course.findFirst({ where: { id: courseId, teacherId: userId } });
    }
}
