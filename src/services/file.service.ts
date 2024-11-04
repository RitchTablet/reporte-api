import { Injectable } from '@nestjs/common';
import { ReportDto } from '@modules/report/dto/report.dto';

import * as ExcelJS from 'exceljs';
import * as path from 'path';

import {
  addTableExcel,
  ExcelColumsReport,
  generateStylesExcelBody,
  generateStylesExcelHeader,
} from '@shared/constants/excel.const';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from '@shared/entities/file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {  
  constructor(
    @InjectRepository(FileEntity)
    private readonly _fileRepository: Repository<FileEntity>,
  ) {}

  async createExcelFileReport(
    monthName: string,
    reportData: ReportDto[],
    month: number,
    year: number,
  ): Promise<string> {
    try {
      const professionalName = 'Jesus Raul Alarcon Ontiveros';
      const templateName = `RHM_${monthName ?? 'Mes'}_${professionalName}.xlsx`;

      const directoryPath = this.getFilesBasePath();
      const filePath = path.join(directoryPath, templateName);

      let workbook: ExcelJS.Workbook = new ExcelJS.Workbook();
      let worksheet: ExcelJS.Worksheet;

      worksheet = workbook.addWorksheet('Reporte Mensual');

      worksheet.columns = ExcelColumsReport;
      worksheet.getRow(1).height = 60;

      generateStylesExcelHeader(worksheet, ExcelColumsReport);
      generateStylesExcelBody(worksheet, reportData);
      addTableExcel(worksheet, ExcelColumsReport, reportData);

      await workbook.xlsx.writeFile(filePath);

      const newFile = this._fileRepository.create({
        name: templateName,
        type: 'excel',
        month,
        year,
      });

      await this._fileRepository.save(newFile);

      return templateName;
    } catch (error) {
      console.log({ error });
    }
  }

  async getNamesFromExcelFiles(): Promise<string[]> {
    return (await this._fileRepository.find()).map((file) => file.name);
  }

  getFilesBasePath(): string {
    return path.join(__dirname, '..', '..', 'uploads');
  }

  getFullPathFile(templateName:string) : string {
    const directoryPath = this.getFilesBasePath();
    return path.join(directoryPath, templateName);
  }

  getByFilename(filename: string): Promise<FileEntity> {
    return this._fileRepository.findOne({where:{name:filename}})
  }

  getByMonthAndYear(month:number, year:number) :Promise<FileEntity> {
    return this._fileRepository.findOne({where:{month, year}})
  }
}
