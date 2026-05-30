import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { LessonResponseDto } from '../dto/response-lesson.dto';
import { Roles } from '@prisma/client';
import { lessonSelect } from 'src/common/selects/lesson.select';

@Injectable()
export class GetLessonByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(courseId: string, lessonId: string, userId: string, userRole: Roles): Promise<LessonResponseDto> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const lesson = await this.prisma.lesson.findFirst({
            where: { id: lessonId, courseId },
            select: lessonSelect,
        });

        if (!lesson) {
            throw new NotFoundException('Lesson not found');
        }

        return lesson;
    }

    private async findCourseWithOwnership(courseId: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.prisma.course.findUnique({ where: { id: courseId } });
        }
        return this.prisma.course.findFirst({ where: { id: courseId, teacherId: userId } });
    }
}
