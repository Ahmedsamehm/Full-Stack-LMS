import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';
import { GetProfileService } from './services/getProfile.service';
import { UpdateProfileService } from './services/updateProfile.service';
import { ChangePasswordService } from './services/changePassword.service';
import { GetBillingHistoryService } from './services/getBillingHistory.service';
import { PaymentsModule } from '../payments/payments.module';

@Module({
    imports: [PaymentsModule],
    controllers: [SettingsController],
    providers: [SettingsService, GetProfileService, UpdateProfileService, ChangePasswordService, GetBillingHistoryService],
})
export class SettingsModule {}
