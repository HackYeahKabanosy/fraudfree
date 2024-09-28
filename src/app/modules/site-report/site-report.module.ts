import { Module } from '@nestjs/common';
import { SiteReportController } from './site-report.controller';
import { SiteReportService } from './site-report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SiteReportSchema } from './site-report.schema';
import { SiteReportRepository } from './site-report.repository';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SiteReport', schema: SiteReportSchema },
    ]),
    ProviderModule,
  ],
  controllers: [SiteReportController],
  providers: [SiteReportService, SiteReportRepository],
})
export class SiteReportModule {}
