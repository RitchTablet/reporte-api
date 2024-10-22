import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@shared/decorators/public.decorator';
import { User } from './shared/decorators/user.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@User() user): string {
    return this.appService.getHello();
  }
}
