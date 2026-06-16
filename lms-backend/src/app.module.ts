import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TeacherModule } from './modules/teacher/teacher.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { SettingsModule } from './modules/settings/settings.module';
import { JwtAuthGuard } from './core/auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
        }),
        DatabaseModule,
        AuthModule,
        UsersModule,
        CategoriesModule,
        CoursesModule,
        LessonsModule,
        EnrollmentsModule,
        PaymentsModule,
        TeacherModule,
        DashboardModule,
        SettingsModule,
    ],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }, { provide: APP_GUARD, useClass: RolesGuard }],
})
export class AppModule {}
