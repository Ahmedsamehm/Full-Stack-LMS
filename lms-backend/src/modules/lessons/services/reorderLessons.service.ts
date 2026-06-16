import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { ReorderLessonItemDto } from '../dto/reorder-lesson.dto';
import { LessonResponseDto } from '../dto/response-lesson.dto';
import { Roles } from '@prisma/client';
import { lessonSelect } from 'src/common/selects/lesson.select';

@Injectable()
export class ReorderLessonsService {
    constructor(private readonly prisma: PrismaService) {}

    async reorder(courseId: string, items: ReorderLessonItemDto[], userId: string, userRole: Roles): Promise<LessonResponseDto[]> {
        const course = await this.findCourseWithOwnership(courseId, userId, userRole);

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const existingLessons = await this.prisma.lesson.findMany({
            where: { courseId },
            select: { id: true },
        });

        const existingIds = new Set(existingLessons.map((l) => l.id));
        const providedIds = new Set(items.map((i) => i.id));

        if (providedIds.size !== items.length) {
            throw new BadRequestException('Duplicate lesson IDs in reorder list');
        }

        for (const id of providedIds) {
            if (!existingIds.has(id)) {
                throw new NotFoundException(`Lesson ${id} not found in this course`);
            }
        }

        if (existingIds.size !== providedIds.size) {
            throw new BadRequestException('Reorder list must include all lessons in the course');
        }

        await this.prisma.$transaction(
            items.map((item) =>
                this.prisma.lesson.update({
                    where: { id: item.id },
                    data: { orderIndex: item.orderIndex },
                }),
            ),
        );

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
