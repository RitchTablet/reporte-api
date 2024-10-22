import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Public } from '@api/shared/decorators/public.decorator';


@Public()
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get('byMonthAndYear')
  getReportsByMonthAndYear(@Query('month') month: number, @Query('year') year: number) {
    return this.reportService.getReportsByMonthAndYear(month, year);
  }

  @Get('byFilename')
  getReportsByFilename(@Query('filename') filename: string) {
    return this.reportService.getReportsByFilename(filename);
  }

  @Get('excel/generate')
  generateReport(@Query('month') month: number, @Query('year') year: number) {
    return this.reportService.generateReportExcel(month, year);
  }

  @Get('excel/all/names')
  getAllExcelFilesNames() {
    return this.reportService.getAllExcelNames();
  }


  @Get('data/config')
  getReportDataFromConfig() {
    return this.reportService.getReportDataFromConfig();
  }
}
