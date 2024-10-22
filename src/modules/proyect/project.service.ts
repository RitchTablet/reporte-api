import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {  
  findAll() {
    const ASSIGNMENTS_PROJECT = [
      { id: 1, name: 'MX - MER - Inteligencia de Precios / Dig. Cambios de Precio (PriceX, DP, FyV)' },
    ];
    return ASSIGNMENTS_PROJECT;
  }
}
