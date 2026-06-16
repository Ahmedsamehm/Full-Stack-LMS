import { IsString, IsEmail, IsOptional, MaxLength } from 'class-validator';

export class UpdateProfileDto {
    @IsString()
    @IsOptional()
    @MaxLength(100)
    name?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    bio?: string;
}
