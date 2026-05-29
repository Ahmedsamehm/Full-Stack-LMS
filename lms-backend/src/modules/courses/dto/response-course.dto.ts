import { CourseStatus } from '@prisma/client';

export class CourseResponseDto {
    id: string;
    title: string;
    description: string | null;
    price: number;
    categoryId: string;
    thumbnailUrl: string | null;
    teacherId: string;
    status: CourseStatus;
    createdAt: Date;
    updatedAt: Date;
}

export class CourseDetailResponseDto extends CourseResponseDto {
    category?: { id: string; name: string; slug: string };
    teacher?: { id: string; name: string };
    lessons?: { id: string; title: string; duration: number; orderIndex: number }[];
    _count?: { enrollments: number };
}

export class CourseWithCategoryResponseDto extends CourseResponseDto {
    category?: { id: string; name: string; slug: string };
    _count?: { enrollments: number };
}
