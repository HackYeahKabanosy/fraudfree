import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  getUptime() {
    const uptimeInSeconds = process.uptime();

    return {
      uptime: uptimeInSeconds.toFixed(2),
    };
  }
}
