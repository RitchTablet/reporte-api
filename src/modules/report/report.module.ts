import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './entities/report.entity';
import { FileEntity } from '@shared/entities/file.entity';
import { MailService } from '@api/services/mail.service';
import { MailConfig } from '@api/shared/entities/mail-config.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity, FileEntity, MailConfig])],
  controllers: [ReportController],
  providers: [ReportService, FileService, DateService, MailService],
})
export class ReportModule {}
