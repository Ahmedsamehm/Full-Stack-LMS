import { Injectable } from '@nestjs/common';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';
import { PaymentResponseDto } from '../payments/dto/response-payment.dto';
import { UsersResponseDto } from '../users/dto/response-user.dto';
import { GetProfileService } from './services/getProfile.service';
import { UpdateProfileService } from './services/updateProfile.service';
import { ChangePasswordService } from './services/changePassword.service';
import { GetBillingHistoryService } from './services/getBillingHistory.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class SettingsService {
    constructor(
        private readonly getProfileService: GetProfileService,
        private readonly updateProfileService: UpdateProfileService,
        private readonly changePasswordService: ChangePasswordService,
        private readonly getBillingHistoryService: GetBillingHistoryService,
    ) {}

    async getProfile(userId: string): Promise<UsersResponseDto> {
        return this.getProfileService.getProfile(userId);
    }

    async updateProfile(userId: string, dto: UpdateProfileDto): Promise<UsersResponseDto> {
        return this.updateProfileService.updateProfile(userId, dto);
    }

    async changePassword(userId: string, dto: ChangePasswordDto) {
        return this.changePasswordService.changePassword(userId, dto);
    }

    async getBillingHistory(userId: string, pagination: PaginationDto): Promise<PaginatedResult<PaymentResponseDto>> {
        return this.getBillingHistoryService.getBillingHistory(userId, pagination);
    }
}
