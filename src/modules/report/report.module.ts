import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { FileEntity } from '@shared/entities/file.entity';
import { EmailService } from '@services/email.service';


@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, FileEntity])],
  controllers: [ReportController],
  providers: [ReportService, FileService, DateService, EmailService],
})
export class ReportModule {}
