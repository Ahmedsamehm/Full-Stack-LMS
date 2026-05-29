import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseResponseDto } from '../dto/response-course.dto';

@Injectable()
export class UpdateCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async update(id: string, dto: UpdateCourseDto, teacherId: string): Promise<CourseResponseDto> {
        const course = await this.prisma.course.findFirst({ where: { id, teacherId } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
        }

        const updated = await this.prisma.course.update({
            where: { id },
            data: { ...dto },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                categoryId: true,
                thumbnailUrl: true,
                teacherId: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updated;
    }

    async updateAsAdmin(id: string, dto: UpdateCourseDto): Promise<CourseResponseDto> {
        const course = await this.prisma.course.findUnique({ where: { id } });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        if (dto.categoryId) {
            const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
        }

        const updated = await this.prisma.course.update({
            where: { id },
            data: { ...dto },
            select: {
                id: true,
                title: true,
                description: true,
                price: true,
                categoryId: true,
                thumbnailUrl: true,
                teacherId: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        return updated;
    }
}
