import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderService {  
  findAll() {
    const datos = {id:1, name:"Axity"};

    return datos;
  }
}
