import { IsString, IsNotEmpty, IsNumber, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { CourseStatus } from '@prisma/client';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    thumbnailUrl?: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status?: CourseStatus;
}
