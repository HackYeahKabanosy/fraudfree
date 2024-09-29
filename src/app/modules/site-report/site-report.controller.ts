import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteReportService } from './site-report.service';
import { SiteReportResponseDto, CrawlerSiteReportDto } from './site-report.dto';
import { SiteReport } from './site-report.interface';

@ApiTags('SiteReport')
@Controller('SiteReport')
export class SiteReportController {
  constructor(private readonly siteReportService: SiteReportService) {}

  @Post('crawler')
  async crawler(@Body() data: CrawlerSiteReportDto) {
    return await this.siteReportService.crawler(data.url);
  }

  buildResponse(data: SiteReport): SiteReportResponseDto {
    return data
      ? {
          id: data.id,
          url: data.url,
          provider: data.provider,
          data: data.data,
          createdAt: data.createdAt,
        }
      : null;
  }
}
