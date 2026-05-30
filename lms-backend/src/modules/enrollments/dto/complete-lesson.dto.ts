import { IsString, IsNotEmpty } from 'class-validator';

export class CompleteLessonDto {
    @IsString()
    @IsNotEmpty()
    lessonId: string;
}
