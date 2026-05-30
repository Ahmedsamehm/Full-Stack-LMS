import { IsString, IsNotEmpty, IsNumber, IsOptional, IsUrl, Min } from 'class-validator';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(1)
    duration: number;

    @IsString()
    @IsOptional()
    content?: string;

    @IsString()
    @IsOptional()
    @IsUrl()
    videoUrl?: string;
}
