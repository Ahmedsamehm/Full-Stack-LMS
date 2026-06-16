import { Controller, Get, Post, Patch, Body, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UserResponseDto } from 'src/core/auth/dto/response-auth.dto';

@Controller('settings')
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get('profile')
    @ResponseMessage('Profile fetched successfully')
    @HttpCode(HttpStatus.OK)
    getProfile(@CurrentUser() user: UserResponseDto) {
        return this.settingsService.getProfile(user.id);
    }

    @Patch('profile')
    @ResponseMessage('Profile updated successfully')
    @HttpCode(HttpStatus.OK)
    updateProfile(@Body() dto: UpdateProfileDto, @CurrentUser() user: UserResponseDto) {
        return this.settingsService.updateProfile(user.id, dto);
    }

    @Post('change-password')
    @ResponseMessage('Password changed successfully')
    @HttpCode(HttpStatus.OK)
    changePassword(@Body() dto: ChangePasswordDto, @CurrentUser() user: UserResponseDto) {
        return this.settingsService.changePassword(user.id, dto);
    }

    @Get('billing-history')
    @ResponseMessage('Billing history fetched successfully')
    @HttpCode(HttpStatus.OK)
    getBillingHistory(@Query() pagination: PaginationDto, @CurrentUser() user: UserResponseDto) {
        return this.settingsService.getBillingHistory(user.id, pagination);
    }
}
