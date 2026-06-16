import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';

@Injectable()
export class DeleteUserService {
    constructor(private readonly prisma: PrismaService) {}

    async delete(id: string): Promise<{ message: string }> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.prisma.user.delete({ where: { id } });

        return { message: 'User deleted successfully' };
    }
}
