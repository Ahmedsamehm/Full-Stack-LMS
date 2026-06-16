import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { enrollmentSelect } from '../../../common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';
import { EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollFreeService {
    constructor(private readonly prisma: PrismaService) {}

    async enroll(userId: string, courseId: string): Promise<EnrollmentResponseDto> {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (course.price > 0) {
            throw new ConflictException('This is a paid course. Please complete payment.');
        }

        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });

        if (existing) {
            throw new ConflictException('Already enrolled in this course');
        }

        const enrollment = await this.prisma.enrollment.create({
            data: {
                userId,
                courseId,
                status: EnrollmentStatus.ACTIVE,
                expiresAt: null,
            },
            select: enrollmentSelect,
        });

        return enrollment;
    }
}
