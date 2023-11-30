import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getMessage(@Body() body): Promise<any> {
    return this.appService.buildMessage(body);
  }
}
