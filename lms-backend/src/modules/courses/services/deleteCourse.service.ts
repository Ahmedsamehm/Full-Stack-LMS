import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class DeleteCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async delete(id: string, teacherId: string): Promise<{ message: string }> {
        const course = await this.prisma.course.findFirst({ where: { id, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        await this.prisma.course.delete({ where: { id } });

        return { message: 'Course deleted successfully' };
    }

    async deleteAsAdmin(id: string): Promise<{ message: string }> {
        const course = await this.prisma.course.findUnique({ where: { id } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        await this.prisma.course.delete({ where: { id } });

        return { message: 'Course deleted successfully' };
    }
}
