import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { enrollmentSelect } from '../../../common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';
import { EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollByPaymentService {
    constructor(private readonly prisma: PrismaService) {}

    async enroll(userId: string, courseId: string): Promise<EnrollmentResponseDto> {
        const course = await this.prisma.course.findUnique({ where: { id: courseId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId, courseId } },
        });

        if (existing) {
            throw new ConflictException('Already enrolled in this course');
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14);

        const enrollment = await this.prisma.enrollment.create({
            data: {
                userId,
                courseId,
                status: EnrollmentStatus.ACTIVE,
                expiresAt,
            },
            select: enrollmentSelect,
        });

        return enrollment;
    }
}
