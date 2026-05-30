import { CourseStatus } from '@prisma/client';

export class CourseResponseDto {
    id: string;
    title: string;
    description: string | null;
    price: number;
    thumbnailUrl: string | null;
    teacherId: string;

    status: CourseStatus;
    timestamps: {
        createdAt: Date;
        updatedAt: Date;
    };
}

export class CourseWithCategoryResponseDto extends CourseResponseDto {
    category: { id: string; name: string; slug: string };
    stats: { enrollments: number };
}

export class CourseDetailResponseDto extends CourseWithCategoryResponseDto {
    teacher: { id: string; name: string };
    lessons: { id: string; title: string; duration: number; orderIndex: number }[];
}
