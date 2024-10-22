import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es'); 

@Injectable()
export class DateService {

  getMonthDateRangeISO(year: number, month: number): { startDate: string, endDate: string } {
    const startDate = dayjs().year(year).month(month - 1).startOf('month').format('YYYY-MM-DD');
    const endDate = dayjs().year(year).month(month - 1).endOf('month').format('YYYY-MM-DD');

    return { startDate, endDate };
  }

  getMonthName(monthNumber: number): string {    
    return dayjs().month(monthNumber - 1).format('MMMM');
  }

  getCurrentMonth(): number {
    return dayjs().month() + 1;
  }
  
  getCurrentYear(): number {
    return dayjs().year();
  }

  getDateTodayFormat(dateFormat: string = 'YYYY-MM-DD'): string {
    return dayjs().format(dateFormat); 
  }
}
