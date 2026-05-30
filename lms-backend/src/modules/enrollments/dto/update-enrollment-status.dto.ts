import { IsEnum, IsNotEmpty } from 'class-validator';
import { EnrollmentStatus } from '@prisma/client';

export class UpdateEnrollmentStatusDto {
    @IsEnum(EnrollmentStatus)
    @IsNotEmpty()
    status: EnrollmentStatus;
}
