import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { DateService } from '@services/date.service';
import { FileService } from '@services/file.service';
import { ReportDto } from './dto/report.dto';
import { capitalizeFirstLetter } from '@shared/tools/capitalizeFirstLetter';
import { ReportDataFromConfig } from './interfaces/report-data-from-config';
import { UserData } from '@api/shared/decorators/user.decorator';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly _reportRepository: Repository<Report>,
    private readonly _dateService: DateService,
    private readonly _fileService: FileService,
    @InjectRepository(User)
    private readonly _userRepository: Repository<User>,
  ) {}

  async create(createReportDto: CreateReportDto): Promise<Report> {
    const report = this._reportRepository.create(createReportDto);
    return this._reportRepository.save(report);
  }

  async getReportsByMonthAndYear(
    month: number,
    year: number,
  ): Promise<Report[]> {
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

  async getReportsByFilename(filename: string): Promise<Report[]> {
    const { month, year } = await this._fileService.getByFilename(filename);
    return this.getReportsByMonthAndYear(month, year);
  }

  async getReportDataFromConfig(userId: number): Promise<ReportDataFromConfig> {
    const currentDate = this._dateService.getDateTodayFormat();    
    const user = await this._userRepository.findOne({
      where: { id: userId },
      relations: ['provider' ,'teachLead', 'squadLead', 'project', 'tribe'],
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }    

    return {
      provider: user.provider.name,
      consultorId: user.idConsultor,
      userWinId: user.usuarioWindows,
      jiraId: user.idJira,
      axityTribe: user.tribe?.name || 'N/A',
      axitySquadLead: user.squadLead?.name || 'N/A',
      wmTechLead: user.teachLead.name || 'N/A',
      professionalName: user.name,
      assignmentProject: user.project?.id || 0,
      hours: 8,
      date: currentDate,
    };
  }
}
