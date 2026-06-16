import { IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CourseStatus } from '@prisma/client';

export class CourseQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    categoryId?: string;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    @IsUUID()
    teacherId?: string;

    @IsOptional()
    @IsEnum(CourseStatus)
    status?: CourseStatus;
}
