import { IsEmail, IsNotEmpty, MinLength, MaxLength, IsString, IsOptional, IsEnum } from 'class-validator';
import { Roles } from '@prisma/client';

export class AdminCreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(30)
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(Roles)
    @IsOptional()
    role?: Roles;
}