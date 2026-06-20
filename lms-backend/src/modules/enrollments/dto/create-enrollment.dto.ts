import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEnrollmentDto {
    @IsString()
    @IsNotEmpty()
    courseId: string;

    @IsString()
    @IsOptional()
    userId?: string;
}
