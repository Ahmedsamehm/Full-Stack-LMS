import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/database/prisma.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { hashPassword } from '../utils/hashPassword';

@Injectable()
export class RegisterService {
    constructor(private readonly prisma: PrismaService) {}

    async create(createAuthDto: CreateAuthDto) {
        const { email, password, confirmPassword } = createAuthDto;

        if (password !== confirmPassword) {
            throw new BadRequestException('Passwords do not match');
        }

        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await hashPassword(password);

        const user = await this.prisma.user.create({
            data: {
                name: createAuthDto.name,
                email,
                passwordHash: hashedPassword,
            },
            select: {
                id: true,
                name: true,
                email: true,
                status: true,
                createdAt: true,
            },
        });

        return user;
    }
}
