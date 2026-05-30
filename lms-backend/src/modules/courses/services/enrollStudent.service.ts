import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { enrollmentSelect } from 'src/common/selects/course.select';

@Injectable()
export class EnrollStudentService {
    constructor(private readonly prisma: PrismaService) {}

    async enroll(courseId: string, teacherId: string, studentEmail: string): Promise<any> {
        const course = await this.prisma.course.findFirst({ where: { id: courseId, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const student = await this.prisma.user.findUnique({ where: { email: studentEmail } });

        if (!student) {
            throw new NotFoundException('Student not found');
        }

        const existingEnrollment = await this.prisma.enrollment.findFirst({
            where: { courseId, userId: student.id },
        });

        if (existingEnrollment) {
            throw new ConflictException('Student is already enrolled in this course');
        }

        const enrollment = await this.prisma.enrollment.create({
            data: { courseId, userId: student.id, status: 'ACTIVE' },
            select: enrollmentSelect,
        });

        return enrollment;
    }
}
