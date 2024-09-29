import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { SiteReportModule } from './modules/site-report/site-report.module';
import { ConclusionModule } from './modules/conclusion/conclusion.module';
import { ProviderModule } from './modules/provider/provider.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    SiteReportModule,
    ConclusionModule,
    ProviderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
