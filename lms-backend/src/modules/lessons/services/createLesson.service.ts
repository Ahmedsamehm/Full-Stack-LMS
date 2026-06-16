import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateLessonDto } from '../dto/create-lesson.dto';
import { LessonResponseDto } from '../dto/response-lesson.dto';
import { Roles } from '@prisma/client';
import { lessonSelect } from '../../../common/selects/lesson.select';

@Injectable()
export class CreateLessonService {
    constructor(private readonly prisma: PrismaService) {}

    async create(courseId: string, dto: CreateLessonDto, userId: string, userRole: Roles): Promise<LessonResponseDto> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const maxOrder = await this.prisma.lesson.aggregate({
            where: { courseId },
            _max: { orderIndex: true },
        });

        const nextOrder = (maxOrder._max.orderIndex ?? 0) + 1;

        const lesson = await this.prisma.lesson.create({
            data: {
                courseId,
                title: dto.title,
                duration: dto.duration,
                content: dto.content,
                videoUrl: dto.videoUrl,
                orderIndex: nextOrder,
            },
            select: lessonSelect,
        });

        return lesson;
    }

    private async findCourseWithOwnership(courseId: string, userId: string, userRole: Roles) {
        if (userRole === Roles.Super_Admin || userRole === Roles.Admin) {
            return this.prisma.course.findUnique({ where: { id: courseId } });
        }

        // For Teacher: check course exists first, then verify ownership
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });
        if (!course) return null; // triggers NotFoundException

        if (course.teacherId !== userId) {
            throw new ForbiddenException('You do not have permission to manage this course');
        }

        return course;
    }
}
