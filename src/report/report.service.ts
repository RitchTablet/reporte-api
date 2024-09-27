import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ExcelService } from '@services/excel.service';

@Injectable()
export class ReportService {

  constructor(private readonly _excelService: ExcelService) {}

  async create(createReportDto: CreateReportDto) {
    console.log({createReportDto});
    const filePath = await this._excelService.createReport(createReportDto);
    return { message: 'Archivo Excel creado', filePath };

    // return createReportDto;
  }

  findAll() {
    return `This action returns all report`;
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  update(id: number, updateReportDto: UpdateReportDto) {
    return `This action updates a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
