import { Injectable } from '@nestjs/common';
import { SiteReportRepository } from './site-report.repository';
import { CreateSiteReportDto, SiteReportResponseDto } from './site-report.dto';
import { ProviderService } from '../provider/provider.service';
import { ProviderResponseDto } from '../provider/provider.dto';

@Injectable()
export class SiteReportService {
  constructor(
    private readonly siteReportRepository: SiteReportRepository,
    private readonly providerService: ProviderService,
  ) {}

  async crawler(url: string) {
    const reportData: ProviderResponseDto[] =
      await this.providerService.factory(url);

    for (const report of reportData) {
      await this.siteReportRepository.create({
        url,
        provider: report.provider,
        data: report.report,
      });
    }

    return reportData;
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
