import { Injectable } from '@nestjs/common';
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

@Injectable()
export class ProviderService {
  private readonly providers;

  constructor(
    private virusTotal: VirusTotal,
    private trustPilotChecker: TrustPilotChecker,
    private htmlParse: HTMLParse,
    private legalKeywordsChecker: LegalKeywordsChecker,
    private htmlTextModule: HtmlTextModule,
    private mediaModule: MediaModule,
    private updateDate: UpdateDate,
    private themeChecker: ThemeChecker,
    private fraudPrediction: FraudPrediction,
  ) {
    this.providers = {
      legalKeywordsChecker: this.legalKeywordsChecker,
      virusTotal: this.virusTotal,
      htmlParse: this.htmlParse,
      htmlTextModule: this.htmlTextModule,
      themeChecker: this.themeChecker,
      mediaModule: this.mediaModule,
      updateDate: this.updateDate,
      trustPilotChecker: this.trustPilotChecker,
      fraudPrediction: this.fraudPrediction,
    };
  }

  async executeProvider(
    providerName: string,
    url: string,
    dependencies: any,
  ): Promise<any> {
    const provider = this.providers[providerName];
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`);
    }
    return await provider.factory(url, dependencies);
  }

  async factory(url: string) {
    const results = {};
    for (const providerName in this.providers) {
      results[providerName] = await this.executeProvider(providerName, url, {
        results,
      });
    }
    return results;
  }
}
