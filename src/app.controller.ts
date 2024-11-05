import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@shared/decorators/public.decorator';
import { UserData } from './shared/decorators/user.decorator';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@UserData() user): string {
    return this.appService.getHello();
  }
}
