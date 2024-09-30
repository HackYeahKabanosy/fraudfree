import { Injectable } from '@nestjs/common';
import { SiteReportRepository } from './site-report.repository';
import { CreateSiteReportDto, SiteReportResponseDto } from './site-report.dto';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class SiteReportService {
  constructor(
    private readonly siteReportRepository: SiteReportRepository,
    private readonly providerService: ProviderService,
  ) {}

  async crawler(url: string) {
    const reportData = await this.providerService.factory(url);

    for (const layer in reportData) {
      for (const report of reportData[layer]) {
        await this.siteReportRepository.create({
          url,
          provider: report.provider,
          layer: report.layer,
          data: report.report,
        });
      }
    }

    return reportData;
  }

  async getReportsByUrl(url: string) {
    const reports = await this.siteReportRepository.getByUrl(url);
    const organizedReports = {};

    for (const report of reports) {
      if (!organizedReports[report.layer]) {
        organizedReports[report.layer] = [];
      }
      organizedReports[report.layer].push(report);
    }

    return organizedReports;
  }

  async create(data: CreateSiteReportDto): Promise<SiteReportResponseDto> {
    return this.siteReportRepository.create(data);
  }

  async getNotEq(
    url: string,
    provider: string,
  ): Promise<SiteReportResponseDto[]> {
    return this.siteReportRepository.getNotEq(url, provider);
  }

  async getEqual(
    url: string,
    provider: string,
  ): Promise<SiteReportResponseDto> {
    return this.siteReportRepository.getEqual(url, provider);
  }
}
