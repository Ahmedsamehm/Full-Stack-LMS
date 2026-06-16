export function toCourseResponse(course: any) {
    return {
        id: course.id,
        title: course.title,
        description: course.description,
        price: course.price,
        thumbnailUrl: course.thumbnailUrl,
        teacherId: course.teacherId,
        categoryId: course.categoryId,

        status: course.status,
        timestamps: {
            createdAt: course.createdAt,
            updatedAt: course.updatedAt,
        },
    };
}

export function toCourseWithCategoryResponse(course: any) {
    const { timestamps, ...rest } = toCourseResponse(course);

    return {
        ...rest,
        category: course.category,
        stats: { enrollments: course._count?.enrollments ?? 0 },
        timestamps,
    };
}

export function toCourseDetailResponse(course: any) {
    const { timestamps, ...rest } = toCourseWithCategoryResponse(course);

    return {
        ...rest,
        teacher: course.teacher,
        lessons: course.lessons ?? [],
        timestamps,
    };
}
