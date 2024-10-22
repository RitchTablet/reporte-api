import { ReportDto } from '@report/dto/report.dto';
import * as ExcelJS from 'exceljs';

export interface ExcelColumsReportType {
  header: string;
  key: string;
  width: number;
}

export const ExcelColumsReport: ExcelColumsReportType[] = [
  { header: 'Proveedor', key: 'provider', width: 13.85546875 },
  { header: 'Fecha', key: 'date', width: 16.85546875 },
  { header: 'ID Consultor', key: 'consultorId', width: 20 },
  { header: 'Usuario de Windows', key: 'userWinId', width: 8.140625 },
  {
    header: 'Nombre del profesional',
    key: 'professionalName',
    width: 19.42578125,
  },
  { header: 'Axity Tribe', key: 'axityTribe', width: 11.42578125 },
  { header: 'Axity Squad Lead', key: 'axitySquadLead', width: 18.140625 },
  { header: 'WM Tech Lead', key: 'wmTechLead', width: 27 },
  { header: 'ID Jira', key: 'jiraId', width: 16 },
  { header: 'Nombre del proyecto', key: 'proyectName', width: 36.42578125 },
  { header: 'Actividades', key: 'activitiesDescription', width: 38.42578125 },
  { header: 'Horas', key: 'hours', width: 10.42578125 },
  { header: 'Entregables', key: 'deliverables', width: 38.42578125 },
  { header: 'Comentarios', key: 'comments', width: 38.42578125 },
];

export const generateStylesExcelHeader = (
  worksheet: ExcelJS.Worksheet,
  ExcelColums: ExcelColumsReportType[],
) => {
  ExcelColums.forEach((col, index) => {
    const cell = worksheet.getCell(`${String.fromCharCode(65 + index)}1`); // A1, B1, C1, etc.

    // Definir colores para C, F y G (2, 5 y 6 en base cero)
    const specialColumns = [2, 5, 6];
    if (specialColumns.includes(index)) {
      // Color para C, F y G (por ejemplo, un azul claro)
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '5B9BD5' }, // Color de fondo azul claro
      };
    } else {
      // Color para las demás columnas
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '002060' }, // Color de fondo azul oscuro
      };
    }

    // Configuración común para todas las cabeceras
    cell.font = {
      name: 'Segoe',
      color: { argb: 'FFFFFF' }, // Texto en blanco
      bold: true,
      size: 10, // Tamaño de fuente
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center',
      wrapText: true,
    };
  });
};

export const generateStylesExcelBody = (
  worksheet: ExcelJS.Worksheet,
  reportData: ReportDto[],
) => {
  reportData.forEach((row, rowIndex) => {
    const newRow = worksheet.addRow(row);

    // Centrar el contenido de cada celda en la fila
    newRow.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
      cell.font = {
        name: 'Segoe',
        size: 10,
      };
    });
  });
};

export const addTableExcel = (worksheet: ExcelJS.Worksheet, ExcelColums: ExcelColumsReportType[],reportData: ReportDto[],) => {
  worksheet.addTable({
    name: 'MiTabla',
    ref: 'A1',
    headerRow: true,
    style: {
      theme: 'TableStyleLight16',
      showRowStripes: true,
    },
    columns: ExcelColums.map((col) => ({ name: col.header })),
    rows: reportData.map((row) => ExcelColums.map((col) => row[col.key])),
  });
};
