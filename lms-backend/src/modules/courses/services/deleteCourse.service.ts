import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class DeleteCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async delete(id: string, teacherId: string): Promise<{ message: string }> {
        const course = await this.prisma.course.findFirst({ where: { id, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        try {
            await this.prisma.course.delete({ where: { id } });
        } catch (error) {
            if (error?.code === 'P2003') {
                throw new BadRequestException('Cannot delete course: it has associated records that prevent deletion.');
            }
            throw error;
        }

        return { message: 'Course deleted successfully' };
    }

    async deleteAsAdmin(id: string): Promise<{ message: string }> {
        const course = await this.prisma.course.findUnique({ where: { id } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        try {
            await this.prisma.course.delete({ where: { id } });
        } catch (error) {
            if (error?.code === 'P2003') {
                throw new BadRequestException('Cannot delete course: it has associated records that prevent deletion.');
            }
            throw error;
        }

        return { message: 'Course deleted successfully' };
    }
}
