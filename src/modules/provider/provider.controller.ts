import { Controller, Get } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { Public } from '@api/shared/decorators/public.decorator';

@Public()
@Controller('provider')
export class ProviderController {
  constructor(private readonly providerService: ProviderService) {}  

  @Get()
  findAll() {
    return this.providerService.findAll();
  }
}
