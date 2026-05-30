import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { enrollmentDetailSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentDetailResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class CompleteLessonService {
    constructor(private readonly prisma: PrismaService) {}

    async completeLesson(enrollmentId: string, lessonId: string, userId: string): Promise<EnrollmentDetailResponseDto> {
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { id: enrollmentId, userId },
        });

        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        if (enrollment.status !== 'ACTIVE') {
            throw new BadRequestException('Enrollment is not active');
        }

        if (enrollment.expiresAt && enrollment.expiresAt < new Date()) {
            throw new BadRequestException('Enrollment has expired');
        }

        const lesson = await this.prisma.lesson.findFirst({
            where: { id: lessonId, courseId: enrollment.courseId },
        });

        if (!lesson) {
            throw new NotFoundException('Lesson not found in this course');
        }

        const existingProgress = await this.prisma.lessonProgress.findUnique({
            where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
        });

        if (existingProgress?.completed) {
            throw new ConflictException('Lesson already completed');
        }

        await this.prisma.lessonProgress.upsert({
            where: { enrollmentId_lessonId: { enrollmentId, lessonId } },
            update: { completed: true, completedAt: new Date() },
            create: { enrollmentId, lessonId, completed: true, completedAt: new Date() },
        });

        const totalLessons = await this.prisma.lesson.count({
            where: { courseId: enrollment.courseId },
        });

        const completedLessons = await this.prisma.lessonProgress.count({
            where: { enrollmentId, completed: true },
        });

        const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        await this.prisma.enrollment.update({
            where: { id: enrollmentId },
            data: { progress },
        });

        const updated = await this.prisma.enrollment.findUnique({
            where: { id: enrollmentId },
            select: enrollmentDetailSelect,
        });

        return updated!;
    }
}
