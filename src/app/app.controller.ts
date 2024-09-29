import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  @Get('/')
  getUptime() {
    const uptimeInSeconds = process.uptime();

    return {
      uptime: uptimeInSeconds.toFixed(2),
    };
  }

  @Get('/ping')
  getPong() {
    const uptimeInSeconds = process.uptime();

    return {
      message: 'pong',
      uptime: uptimeInSeconds.toFixed(2),
    };
  }
}
