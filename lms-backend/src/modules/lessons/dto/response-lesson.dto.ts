export class LessonResponseDto {
    id: string;
    courseId: string;
    title: string;
    duration: number;
    content: string | null;
    videoUrl: string | null;
    orderIndex: number;
    createdAt: Date;
}
