import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { BuildMessagePayload } from './types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/messages')
  getMessage(@Body() body: BuildMessagePayload): Promise<any> {
    return this.appService.buildMessage(body);
  }

  @Post('/chart')
  getChartMessage(@Body() body: BuildMessagePayload): Promise<any> {
    return this.appService.buildChart(body);
  }
}
