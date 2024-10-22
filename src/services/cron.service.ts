import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ReportService } from '@report/report.service';
import { DateService } from './date.service';
import { capitalizeFirstLetter } from '@shared/tools/capitalizeFirstLetter';
import { FileService } from './file.service';
import { EmailService } from './email.service';

@Injectable()
export class CronService {
  constructor(
    private readonly _reporService: ReportService,
    private readonly _dateService: DateService,
    private readonly _fileService: FileService,
    private readonly _emailService: EmailService,
  ) {}

  // @Cron(CronExpression.EVERY_MINUTE)
  // async handleCron() {
  //   try {
  //     console.log('Tarea cron ejecutada cada minuto.');
  //     const passMonth = this._dateService.getCurrentMonth() - 1;
  //     const year = this._dateService.getCurrentYear();      

  //     const templateName = await this._reporService.generateReportExcel(
  //       passMonth,
  //       year,
  //     );      

  //     const filename = templateName;
  //     const path = this._fileService.getFullPathFile(filename);
  //     const attachments = [{ filename, path }];
  //     await this._emailService.sendEmail(
  //       'Jesus.Alarcon@axity.com',
  //       'Asunto del correo para pruebas',
  //       'Contenido del correo este es un contenido de prueba',
  //       attachments,
  //     );
  //   } catch (error) {
  //       console.error("Error en el Cron.")
  //   }
  // }

  @Cron('0 0 1 * *') // cada primero de cada mes
  handleMonthlyCron() {
    console.log('Tarea cron ejecutada el 1ro de cada mes a la medianoche');

    // const filename = "RHM_Octubre_Jesus Raul Alarcon Ontiveros.xlsx";
    // const path =  this._fileService.getFullPathFile(filename);
    // const attachments = [{filename, path}];
    // await this._emailService.sendEmail(
    //   'Jesus.Alarcon@axity.com',
    //   'Asunto del correo para pruebas',
    //   'Contenido del correo este es un contenido de prueba',
    //   attachments
    // );
  }
}
