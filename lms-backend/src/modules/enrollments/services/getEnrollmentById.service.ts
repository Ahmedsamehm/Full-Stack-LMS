import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { enrollmentDetailSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentDetailResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class GetEnrollmentByIdService {
    constructor(private readonly prisma: PrismaService) {}

    async findById(id: string, userId: string): Promise<EnrollmentDetailResponseDto> {
        const enrollment = await this.prisma.enrollment.findFirst({
            where: { id, userId },
            select: enrollmentDetailSelect,
        });

        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        return enrollment;
    }
}
