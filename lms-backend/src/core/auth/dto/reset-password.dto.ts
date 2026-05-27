import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  NewPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmNewPassword: string;
}
