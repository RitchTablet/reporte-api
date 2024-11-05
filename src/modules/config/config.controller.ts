import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { UserData } from '@api/shared/decorators/user.decorator';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('all')
  findAll(@UserData('id') userId: number) {
    return this.configService.findAll(userId);
  }
}
