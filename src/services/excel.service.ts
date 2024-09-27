import { Injectable } from '@nestjs/common';

import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path';
import { CreateReportDto } from 'src/report/dto/create-report.dto';
import { ExcelColumsReport } from 'src/shared/constants/excel.const';
import { DateService } from './date.service';
import { capitalizeFirstLetter } from '@shared/tools/capitalizeFirstLetter';

@Injectable()
export class ExcelService {
  constructor(private readonly _dateService: DateService) {}

  async createReport(createReportDto: CreateReportDto): Promise<string> {
    try {
      const { date, professionalName } = createReportDto;
      
      const dateISO =  this._dateService.convertToISO(date);
      const month = capitalizeFirstLetter(this._dateService.getMonthName(dateISO));

      console.log({month});

      const templatePath = path.join(
        __dirname,
        '..',
        '..',
        'templates',
        'template.xlsx',
      );

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);

      console.log('leyendo...');
      console.log(
        'Available Sheets:',
        workbook.worksheets.map((sheet) => sheet.name),
      );

      const worksheet = workbook.getWorksheet('Reporte Mensual');

      if (!worksheet) {
        throw new Error('Hoja de trabajo "Reporte Mensual" no encontrada.');
      }

      worksheet.columns = ExcelColumsReport;
      const row = worksheet.addRow(createReportDto);

      //   Aplicar alineación centrada a todas las celdas de la fila
      row.eachCell((cell) => {
        cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado horizontal y vertical
      });

      //     provider: createReportDto.provider,
      //     consultorId: createReportDto.consultorId,
      //     userWinId: createReportDto.userWinId,
      //     jiraId: createReportDto.jiraId,
      //     axityTribe: createReportDto.axityTribe,
      //     axitySquadLead: createReportDto.axitySquadLead,
      //     // wMTechLead: "asdasdasdasdasasasdasd",
      //     assignmentProject: createReportDto.assignmentProject,
      //     hours: createReportDto.hours,
      //     date: createReportDto.date,
      //     activitiesDescription: createReportDto.activitiesDescription,
      //     deliverables: createReportDto.deliverables,
      //     comments: createReportDto.comments,
      //   });

      //   const headerRow = worksheet.getRow(1);
      //   const headersDetails = [];
      //   headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
      //     // Obtenemos la anchura de la columna
      //     const column = worksheet.getColumn(colNumber);

      //     headersDetails.push({
      //       header: cell.value,   // El valor del cabecero
      //       key: `col_${colNumber}`, // Generamos una key única basada en el número de columna (puedes ajustar según tu caso)
      //       width: column.width,  // La anchura de la columna
      //     });
      //   });

      //   console.log({headersDetails});

      //   worksheet.addRow({
      //     provider: "hola",
      //   });
      // Escribir los datos en las celdas correspondientes del template
      //   worksheet.getCell('A2').value =  'hola que tal'; // Asegúrate de que no sea null o undefined
      //   worksheet.getCell('B2').value = data.consultorId || '';
      //   worksheet.getCell('C2').value = data.userWinId || '';
      //   worksheet.getCell('D2').value = data.jiraId || '';
      //   worksheet.getCell('E2').value = data.axityTribe || '';
      //   worksheet.getCell('F2').value = data.axitySquadLead || '';
      //   worksheet.getCell('G2').value = data.wMTechLead || '';
      //   worksheet.getCell('H2').value = data.assignmentProject || '';
      //   worksheet.getCell('I2').value = data.hours || '';
      //   worksheet.getCell('J2').value = data.date || '';
      //   worksheet.getCell('K2').value = data.activitiesDescription || '';
      //   worksheet.getCell('L2').value = data.deliverables || '';
      //   worksheet.getCell('M2').value = data.comments || '';

      // Definir la ruta donde se guardará el archivo modificado
      const directoryPath = path.join(__dirname, '..', '..', 'files');

      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath); // Crear la carpeta 'files' si no existe
      }

      const filePath = path.join(
        directoryPath,
        `RHM_${month ?? 'Mes'}_${professionalName}.xlsx`,
      );

      await workbook.xlsx.writeFile(filePath);

      return filePath;
    } catch (error) {
      console.error('Error al llenar el template de Excel', error);
      throw new Error('No se pudo llenar el template de Excel');
    }
  }

  async some(data) {
    try {
      // Crear un nuevo libro de Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Reporte');

      // Añadir encabezados
      worksheet.columns = [
        { header: 'Provider', key: 'provider', width: 20 },
        { header: 'Consultor ID', key: 'consultorId', width: 15 },
        { header: 'User Win ID', key: 'userWinId', width: 15 },
        { header: 'Jira ID', key: 'jiraId', width: 20 },
        { header: 'Axity Tribe', key: 'axityTribe', width: 20 },
        { header: 'Axity Squad Lead', key: 'axitySquadLead', width: 30 },
        { header: 'WM Tech Lead', key: 'wMTechLead', width: 25 },
        { header: 'Assignment Project', key: 'assignmentProject', width: 20 },
        { header: 'Hours', key: 'hours', width: 10 },
        { header: 'Date', key: 'date', width: 15 },
        {
          header: 'Activities Description',
          key: 'activitiesDescription',
          width: 30,
        },
        { header: 'Deliverables', key: 'deliverables', width: 30 },
        { header: 'Comments', key: 'comments', width: 30 },
      ];

      // Añadir una fila con los datos recibidos
      worksheet.addRow({
        provider: data.provider,
        consultorId: data.consultorId,
        userWinId: data.userWinId,
        jiraId: data.jiraId,
        axityTribe: data.axityTribe,
        axitySquadLead: data.axitySquadLead,
        wMTechLead: data.wMTechLead,
        assignmentProject: data.assignmentProject,
        hours: data.hours,
        date: data.date,
        activitiesDescription: data.activitiesDescription,
        deliverables: data.deliverables,
        comments: data.comments,
      });

      // Definir la ruta donde se guardará el archivo
      const directoryPath = path.join(__dirname, '..', '..', 'files');
      if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath); // Crear la carpeta 'files' si no existe
      }
      const filePath = path.join(directoryPath, `report_${Date.now()}.xlsx`);

      // Escribir el archivo en el sistema de archivos
      await workbook.xlsx.writeFile(filePath);

      // Retornar la ruta del archivo creado
      return filePath;
    } catch (error) {
      console.error('Error creando el archivo Excel', error);
      throw new Error('No se pudo crear el archivo Excel');
    }
  }
}
