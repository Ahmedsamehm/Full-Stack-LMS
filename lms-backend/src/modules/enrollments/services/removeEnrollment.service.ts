import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class RemoveEnrollmentService {
    constructor(private readonly prisma: PrismaService) {}

    async remove(id: string): Promise<{ message: string }> {
        const enrollment = await this.prisma.enrollment.findUnique({ where: { id } });

        if (!enrollment) {
            throw new NotFoundException('Enrollment not found');
        }

        await this.prisma.enrollment.delete({ where: { id } });

        return { message: 'Enrollment removed successfully' };
    }
}
