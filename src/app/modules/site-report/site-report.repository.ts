import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { documentToObject } from 'src/app/core/utils/database';
import { SiteReport } from './site-report.interface';
import { CreateSiteReportDto, SiteReportResponseDto } from './site-report.dto';

@Injectable()
export class SiteReportRepository {
  constructor(
    @InjectModel('SiteReport')
    private readonly siteReportModel: Model<SiteReport>,
  ) {}

  public async create(
    data: CreateSiteReportDto,
  ): Promise<SiteReportResponseDto> {
    return documentToObject<SiteReportResponseDto>(
      await this.siteReportModel.create(data),
    );
  }

  async getByUrl(url: string): Promise<SiteReport[]> {
    return await this.siteReportModel.find({ url });
  }

  async getNotEq(
    url: string,
    provider: string,
  ): Promise<SiteReportResponseDto[]> {
    return await this.siteReportModel.find({
      $and: [{ url }, { provider: { $ne: provider } }],
    });
  }

  async getEqual(
    url: string,
    provider: string,
  ): Promise<SiteReportResponseDto> {
    return await this.siteReportModel.findOne(
      {
        $and: [{ url }, { provider }],
      },
      {},
      { sort: { createdAt: -1 } },
    );
  }
}
