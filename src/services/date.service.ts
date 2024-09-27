import { Injectable } from '@nestjs/common';
import { format, parse, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable()
export class DateService {

  isISOFormat(date: string): boolean {
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    return isoRegex.test(date);
  }

  convertToISO(date: string, inComingDateFormat:string ='dd/MM/yyyy'): string {
    if (this.isISOFormat(date)) {
      return date;
    }

    const parsedDate = parse(date, inComingDateFormat, new Date());
    return format(parsedDate, 'yyyy-MM-dd');
  }

  getMonthName(date: string): string {
    const parsedDate = parseISO(date);
    return format(parsedDate, 'MMMM', { locale: es });
  }
}
