// src/app/modules/provider/provider.module.ts

import { Module } from '@nestjs/common';
import { ProviderService } from './provider.service';
import {
  TrustPilotChecker,
  VirusTotal,
  HTMLParse,
  LegalKeywordsChecker,
  HtmlTextModule,
  MediaModule,
  UpdateDate,
  ThemeChecker,
  FraudPrediction,
} from './providers';

@Module({
  providers: [
    ProviderService,
    TrustPilotChecker,
    VirusTotal,
    HTMLParse,
    LegalKeywordsChecker,
    HtmlTextModule,
    MediaModule,
    UpdateDate,
    ThemeChecker,
    FraudPrediction,
  ],
  exports: [ProviderService],
})
export class ProviderModule {}
