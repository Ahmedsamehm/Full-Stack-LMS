import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { userSelect } from 'src/common/selects/user.select';

@Injectable()
export class GetUserDetailsService {
    constructor(private readonly prisma: PrismaService) {}

    async getUserDetails(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                ...userSelect,
                _count: {
                    select: {
                        enrollments: true,
                        courses: true, // courses taught
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const totalSpendResult = await this.prisma.payment.aggregate({
            _sum: {
                amount: true,
            },
            where: {
                userId: id,
                status: 'SUCCESS',
            },
        });

        return {
            ...user,
            totalSpend: totalSpendResult._sum.amount || 0,
        };
    }
}
