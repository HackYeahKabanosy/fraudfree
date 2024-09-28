import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SiteReportService } from './site-report.service';
import {
  CreateSiteReportDto,
  SiteReportResponseDto,
  GetSiteReportDto,
  CrawlerSiteReportDto,
} from './site-report.dto';
import { SiteReport } from './site-report.interface';

@ApiTags('SiteReport')
@Controller('SiteReport')
export class SiteReportController {
  constructor(private readonly siteReportService: SiteReportService) {}

  @Post('crawler')
  async crawler(@Body() data: CrawlerSiteReportDto) {
    return await this.siteReportService.crawler(data.url);
  }

  @Post()
  async create(
    @Body() data: CreateSiteReportDto,
  ): Promise<SiteReportResponseDto> {
    return this.buildResponse(await this.siteReportService.create(data));
  }

  @Get()
  async get(@Query() data: GetSiteReportDto): Promise<SiteReportResponseDto[]> {
    return await this.siteReportService.get(data.url);
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
