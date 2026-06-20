import { ConflictException, ForbiddenException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { enrollmentSelect } from '../../../common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';
import { EnrollmentStatus, Roles } from '@prisma/client';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';

@Injectable()
export class EnrollService {
    constructor(private readonly prisma: PrismaService) {}

    async enroll(dto: CreateEnrollmentDto, currentUser: { id: string; role: Roles }): Promise<EnrollmentResponseDto> {
        const course = await this.prisma.course.findUnique({ where: { id: dto.courseId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const isStudent = currentUser.role === Roles.Student;
        const isTeacher = currentUser.role === Roles.Teacher;
        const isAdmin = currentUser.role === Roles.Admin || currentUser.role === Roles.Super_Admin;

        let targetUserId: string;

        if (isStudent) {
            if (dto.userId && dto.userId !== currentUser.id) {
                throw new ForbiddenException('Students can only enroll themselves');
            }
            if (course.price > 0) {
                throw new ConflictException('This is a paid course. Please complete payment.');
            }
            targetUserId = currentUser.id;
        } else if (isTeacher) {
            if (!dto.userId) {
                throw new BadRequestException('userId is required for teacher enrollment');
            }
            const ownsCourse = await this.prisma.course.findFirst({
                where: { id: dto.courseId, teacherId: currentUser.id },
            });
            if (!ownsCourse) {
                throw new ForbiddenException('You can only enroll students in your own courses');
            }
            const student = await this.prisma.user.findUnique({ where: { id: dto.userId } });
            if (!student) {
                throw new NotFoundException('Student not found');
            }
            targetUserId = dto.userId;
        } else if (isAdmin) {
            if (!dto.userId) {
                throw new BadRequestException('userId is required for admin enrollment');
            }
            const student = await this.prisma.user.findUnique({ where: { id: dto.userId } });
            if (!student) {
                throw new NotFoundException('Student not found');
            }
            targetUserId = dto.userId;
        } else {
            throw new ForbiddenException('Invalid role');
        }

        const existing = await this.prisma.enrollment.findUnique({
            where: { userId_courseId: { userId: targetUserId, courseId: dto.courseId } },
        });

        if (existing) {
            throw new ConflictException('Student is already enrolled in this course');
        }

        const expiresAt = isStudent ? null : this.get14DayExpiration();

        const enrollment = await this.prisma.enrollment.create({
            data: {
                userId: targetUserId,
                courseId: dto.courseId,
                status: EnrollmentStatus.ACTIVE,
                expiresAt,
            },
            select: enrollmentSelect,
        });

        return enrollment;
    }

    private get14DayExpiration(): Date {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 14);
        return expiresAt;
    }
}
