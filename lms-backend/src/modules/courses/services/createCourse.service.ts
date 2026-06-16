import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { CourseResponseDto } from '../dto/response-course.dto';
import { courseBaseSelect } from '../../../common/selects/course.select';
import { toCourseResponse } from '../dto/course.mapper';

@Injectable()
export class CreateCourseService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCourseDto, teacherId: string): Promise<CourseResponseDto> {
        const category = await this.prisma.category.findUnique({ where: { id: dto.categoryId } });

        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const course = await this.prisma.course.create({
            data: {
                title: dto.title,
                description: dto.description,
                price: dto.price,
                categoryId: dto.categoryId,
                thumbnailUrl: dto.thumbnailUrl,
                teacherId,
                status: dto.status ?? 'DRAFT',
            },
            select: courseBaseSelect,
        });

        return toCourseResponse(course);
    }
}
