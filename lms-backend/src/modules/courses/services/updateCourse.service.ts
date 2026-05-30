import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { CourseResponseDto } from '../dto/response-course.dto';
import { courseBaseSelect } from 'src/common/selects/course.select';
import { toCourseResponse } from '../dto/course.mapper';

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
            select: courseBaseSelect,
        });

        return toCourseResponse(updated);
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
            select: courseBaseSelect,
        });

        return toCourseResponse(updated);
    }
}
