import { IsString, IsNotEmpty } from 'class-validator';

export class CreateEnrollmentByTeacherDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    courseId: string;
}
