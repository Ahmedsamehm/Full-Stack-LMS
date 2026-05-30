import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CourseDetailResponseDto } from '../dto/response-course.dto';
import { courseDetailSelect } from 'src/common/selects/course.select';
import { toCourseDetailResponse } from '../dto/course.mapper';

@Injectable()
export class GetCourseByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, status: 'PUBLISHED' },
            select: courseDetailSelect,
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return toCourseDetailResponse(course);
    }

    async findByIdForTeacher(id: string, teacherId: string): Promise<CourseDetailResponseDto> {
        const course = await this.prisma.course.findFirst({
            where: { id, teacherId },
            select: courseDetailSelect,
        });

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return toCourseDetailResponse(course);
    }
}
