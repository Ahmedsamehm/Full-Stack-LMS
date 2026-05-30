import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentByAdminDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;
}
