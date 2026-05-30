import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class CheckEnrollmentExpirationService {
    private readonly logger = new Logger(CheckEnrollmentExpirationService.name);

    constructor(private readonly prisma: PrismaService) {}

    async checkAndExpire(): Promise<{ expired: number }> {
        const result = await this.prisma.enrollment.updateMany({
            where: {
                status: 'ACTIVE',
                expiresAt: { not: null, lt: new Date() },
            },
            data: { status: 'EXPIRED' },
        });

        if (result.count > 0) {
            this.logger.log(`Expired ${result.count} enrollments`);
        }

        return { expired: result.count };
    }
}
