import { IsEnum, IsNotEmpty } from 'class-validator';
import { CourseStatus } from '@prisma/client';

export class ChangeStatusDto {
    @IsEnum(CourseStatus)
    @IsNotEmpty()
    status: CourseStatus;
}
