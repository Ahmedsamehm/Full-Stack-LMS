import { IsOptional, IsString, IsEnum } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { EnrollmentStatus } from '@prisma/client';

export class EnrollmentQueryDto extends PaginationDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(EnrollmentStatus)
    status?: EnrollmentStatus;
}
