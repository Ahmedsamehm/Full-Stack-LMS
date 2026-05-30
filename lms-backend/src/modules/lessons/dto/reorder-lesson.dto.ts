import { IsArray, ValidateNested, IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ReorderLessonItemDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsInt()
    @Min(1)
    orderIndex: number;
}

export class ReorderLessonsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReorderLessonItemDto)
    lessons: ReorderLessonItemDto[];
}
