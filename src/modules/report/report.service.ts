import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './entities/report.entity';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { ReportDto } from './dto/report.dto';
import { capitalizeFirstLetter } from '@shared/tools/capitalizeFirstLetter';
import { ReportDataFromConfig } from './interfaces/report-data-from-config';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReportEntity)
    private readonly _reportRepository: Repository<ReportEntity>,
    private readonly _dateService: DateService,
    private readonly _fileService: FileService,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<ReportEntity> {
    const report = this._reportRepository.create(createReportDto);
    return this._reportRepository.save(report);
  }

  async getReportsByMonthAndYear(
    month: number,
    year: number,
  ): Promise<ReportEntity[]> {
    const { startDate, endDate } = this._dateService.getMonthDateRangeISO(
      year,
      month,
    );

    const reportData = await this._reportRepository
      .createQueryBuilder('report')
      .where('report.date >= :startDate', { startDate })
      .andWhere('report.date <= :endDate', { endDate })
      .orderBy('report.date', 'ASC')
      .getMany();

    if (!reportData || reportData.length == 0) {
      throw new BadRequestException(
        `No existen registros para las fechas: month ${month} - year ${year}`,
      );
    }

    return reportData;
  }

  /**
   * Genera el reporte en excel
   * @param month
   * @param year
   * @returns template name
   */
  async generateReportExcel(month: number, year: number): Promise<string> {
    const reportData = await this.getReportsByMonthAndYear(month, year);

    if (!reportData || reportData.length == 0) {
      throw new BadRequestException(
        `No existen registros para las fechas: month ${month} - year ${year}`,
      );
    }

    const reportDto: ReportDto[] = reportData;
    const monthName = capitalizeFirstLetter(
      this._dateService.getMonthName(month),
    );
    return await this._fileService.createExcelFileReport(
      monthName,
      reportDto,
      month,
      year,
    );
  }

  async getAllExcelNames(): Promise<string[]> {
    return this._fileService.getNamesFromExcelFiles();
  }

  async getReportsByFilename(filename: string): Promise<ReportEntity[]> {
    const { month, year } = await this._fileService.getByFilename(filename);
    return this.getReportsByMonthAndYear(month, year);
  }

  async getReportDataFromConfig(): Promise<ReportDataFromConfig> {
    const currentDate = this._dateService.getDateTodayFormat();
    return {
      provider: 'Axity',
      consultorId: 31949,
      userWinId: 'vn57kvr',
      jiraId: 'ROADSUBIN-17833',
      axityTribe: 'Datos',
      axitySquadLead: 'Marta Alicia Cuamatzi Cuamatzi',
      wmTechLead: 'Victor Flores',
      professionalName: 'Jesus Raul Alarcon Ontiveros',
      assignmentProject: 1,
      hours: 8,
      date: currentDate,
    };
  }
}
