import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { GetMyStudentsService } from './services/getMyStudents.service';

@Module({
    controllers: [TeacherController],
    providers: [GetMyStudentsService],
})
export class TeacherModule {}
