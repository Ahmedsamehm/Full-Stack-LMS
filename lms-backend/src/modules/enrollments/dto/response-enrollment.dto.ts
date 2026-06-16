import { EnrollmentStatus } from '@prisma/client';

export class EnrollmentResponseDto {
    id: string;
    status: EnrollmentStatus;
    progress: number;
    enrolledAt: Date;
    expiresAt: Date | null;
    updatedAt: Date;
    user: { id: string; name: string; email: string };
    course: {
        id: string;
        title: string;
        thumbnailUrl: string | null;
        category?: { id: string; name: string; slug: string } | null;
        teacher?: { id: string; name: string } | null;
    };
}

export class EnrollmentDetailResponseDto extends EnrollmentResponseDto {
    declare course: {
        id: string;
        title: string;
        thumbnailUrl: string | null;
        _count: { lessons: number };
    };
    lessonProgress: {
        id: string;
        completed: boolean;
        completedAt: Date | null;
        lesson: { id: string; title: string; orderIndex: number };
    }[];
}

export class EnrollmentSimpleResponseDto {
    id: string;
    status: EnrollmentStatus;
    progress: number;
    enrolledAt: Date;
    expiresAt: Date | null;
    updatedAt: Date;
}
