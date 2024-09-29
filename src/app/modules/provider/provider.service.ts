import { Injectable } from '@nestjs/common';
import { TrustPilot, VirusTotal } from './providers';
import { ProviderResponseDto } from './provider.dto';

@Injectable()
export class ProviderService {
  private readonly providers = {
    virusTotal: new VirusTotal(),
    trustPilot: new TrustPilot(),
  };

  async factory(url: string): Promise<ProviderResponseDto[]> {
    const result = [];
    for (const provider in this.providers) {
      const report = await this.providers[provider].factory(url);
      if (report) {
        result.push({
          provider,
          report,
        } as ProviderResponseDto);
      }
    }
    return result;
  }
}
