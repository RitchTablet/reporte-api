import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReportService } from '@report/report.service';
import { DateService } from './date.service';
import { FileService } from './file.service';
import { MailService } from './mail.service';

@Injectable()
export class CronService {
  private readonly _logger = new Logger(CronService.name);

  constructor(
    private readonly _reporService: ReportService,
    private readonly _dateService: DateService,
    private readonly _fileService: FileService,
    private readonly _mailService: MailService,
  ) {}

  // cada primero de cada mes a las 12PM
  // @Cron(CronExpression.EVERY_MINUTE) // TODO: only for test
  @Cron('0 12 1 * *')
  async handleCron() {
    try {
      this._logger.log('Creando reporte...');
      const passMonth = this._dateService.getCurrentMonth() - 1;
      const year = this._dateService.getCurrentYear();

      const filename = await this._reporService.generateReportExcel(
        passMonth,
        year,
      );

      this._logger.log(`Se creo el reporte con nombre: ${filename}`);
    } catch (error) {
      this._logger.error(
        `Error caught in ${CronService.name}`,
        error?.stack || error,
      );
    }
  }

  // cada primero de cada mes a las 4PM
  // @Cron(CronExpression.EVERY_MINUTE) // TODO: only for test
  @Cron('0 16 1 * *')
  async handleMonthlyToSendEmailFileReportCron() {
    try {
      this._logger.log('Enviando reporte...');

      const passMonth = this._dateService.getCurrentMonth() - 1;
      const year = this._dateService.getCurrentYear();

      const filename = (
        await this._fileService.getByMonthAndYear(passMonth, year)
      ).name;
      const path = this._fileService.getFullPathFile(filename);
      const attachments = [{ filename, path }];

      await this._mailService.sendEmail(
        'Jesus.Alarcon@axity.com',
        'Correo de reporte.',
        `Este correo contiene el reporte de ${filename}`,
        attachments,
      );
    } catch (error) {
      this._logger.error(
        `Error caught in ${CronService.name} - 4PM`,
        error?.stack || error,
      );
    }
  }
}
