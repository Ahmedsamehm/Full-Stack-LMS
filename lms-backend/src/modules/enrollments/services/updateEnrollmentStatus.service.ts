import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { EnrollmentStatus } from '@prisma/client';
import { enrollmentSelect } from 'src/common/selects/enrollment.select';
import { EnrollmentResponseDto } from '../dto/response-enrollment.dto';

@Injectable()
export class UpdateEnrollmentStatusService {
    constructor(private readonly prisma: PrismaService) {}

    async updateStatus(id: string, status: EnrollmentStatus): Promise<EnrollmentResponseDto> {
        const enrollment = await this.prisma.enrollment.findUnique({ where: { id } });

        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        const validStatuses: EnrollmentStatus[] = ['PENDING', 'ACTIVE', 'REJECTED', 'EXPIRED'];

        if (!validStatuses.includes(status)) {
            throw new BadRequestException('Invalid status');
        }

        const updated = await this.prisma.enrollment.update({
            where: { id },
            data: { status },
            select: enrollmentSelect,
        });

        return updated;
    }
}
