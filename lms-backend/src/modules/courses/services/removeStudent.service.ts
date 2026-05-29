import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class RemoveStudentService {
    constructor(private readonly prisma: PrismaService) {}

    async remove(courseId: string, teacherId: string, enrollmentId: string): Promise<{ message: string }> {
        const course = await this.prisma.course.findFirst({ where: { id: courseId, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const enrollment = await this.prisma.enrollment.findFirst({
            where: { id: enrollmentId, courseId },
        });

        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        await this.prisma.enrollment.delete({ where: { id: enrollmentId } });

        return { message: 'Student removed from course successfully' };
    }
}
