import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { UpdateLessonDto } from '../dto/update-lesson.dto';
import { LessonResponseDto } from '../dto/response-lesson.dto';
import { Roles } from '@prisma/client';
import { lessonSelect } from '../../../common/selects/lesson.select';

@Injectable()
export class UpdateLessonService {
    constructor(private readonly prisma: PrismaService) {}

    async update(courseId: string, lessonId: string, dto: UpdateLessonDto, userId: string, userRole: Roles): Promise<LessonResponseDto> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const lesson = await this.prisma.lesson.findFirst({ where: { id: lessonId, courseId } });

        if (!lesson) {
            throw new NotFoundException('Lesson not found');
        }

        const updated = await this.prisma.lesson.update({
            where: { id: lessonId },
            data: { ...dto },
            select: lessonSelect,
        });

        return updated;
    }

    private async findCourseWithOwnership(courseId: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.prisma.course.findUnique({ where: { id: courseId } });
        }

        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course) return null;

        if (course.teacherId !== userId) {
            throw new ForbiddenException('You do not have permission to manage this course');
        }

        return course;
    }
}
