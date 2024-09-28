import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ExampleModule } from './modules/example/example.module';
import { SiteReportModule } from './modules/site-report/site-report.module';
import { ConclusionModule } from './modules/conclusion/conclusion.module';
import { ProviderModule } from './modules/provider/provider.module';

@Module({
  imports: [DatabaseModule, ExampleModule, SiteReportModule, ConclusionModule, ProviderModule],
})
export class AppModule {}
