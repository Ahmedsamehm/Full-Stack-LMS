import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateEnrollmentByTeacherDto } from '../dto/create-enrollment-by-teacher.dto';
import { enrollmentSelect } from '../../../common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';
import { EnrollmentStatus } from '@prisma/client';

@Injectable()
export class EnrollByTeacherService {
    constructor(private readonly prisma: PrismaService) {}

    async enroll(dto: CreateEnrollmentByTeacherDto, teacherId: string): Promise<EnrollmentResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id: dto.courseId, teacherId },
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const student = await this.prisma.user.findUnique({ where: { id: dto.userId } });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId: dto.userId, courseId: dto.courseId } },
        });

        if (existing) {
            throw new ConflictException('Student is already enrolled in this course');
        }

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14);

        const enrollment = await this.prisma.enrollment.create({
            data: {
                userId: dto.userId,
                courseId: dto.courseId,
                status: EnrollmentStatus.ACTIVE,
                expiresAt,
            },
            select: enrollmentSelect,
        });

        return enrollment;
    }
}
