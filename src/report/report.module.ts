import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { DateService } from '@services/date.service';
import { ExcelService } from '@services/excel.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService, ExcelService, DateService],
})
export class ReportModule {}
