import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConclusionService } from './conclusion.service';
import { ConclusionResponseDto, GetConclusionDto } from './conclusion.dto';
import { Conclusion } from './conclusion.interface';

@ApiTags('Conclusion')
@Controller('Conclusion')
export class ConclusionController {
  constructor(private readonly conclusionService: ConclusionService) {}

  @Get()
  async get(@Query() data: GetConclusionDto): Promise<ConclusionResponseDto> {
    return this.buildResponse(await this.conclusionService.get(data.url));
  }

  private converScanIntoSignal(scamProbability: number) {
    return scamProbability < 2
      ? 'Safe'
      : scamProbability < 4
        ? 'Ok'
        : scamProbability < 6
          ? 'Warning'
          : 'Danger';
  }

  private convertScanIntoMessage(scamProbability: number): string {
    return scamProbability < 2
      ? 'This e-commerce site has a strong reputation and is confirmed to be legitimate. You can browse and make purchases with confidence.'
      : scamProbability < 4
        ? 'This website appears trustworthy based on its domain history and online reputation. If it’s a marketplace, it’s a good idea to check the credibility of the individual seller.'
        : scamProbability < 6
          ? "This website raises some concerns. It’s important to verify its authenticity, especially if you haven't heard of this store before. Look for well-known brand indicators and be cautious when sharing personal information."
          : 'This website shows multiple signs of being a potential scam. Information is limited or unclear, and there are several red flags that suggest it may not be safe to use. Proceed with extreme caution, or avoid using this site altogether.';
  }

  buildResponse(data: Conclusion): ConclusionResponseDto {
    return data
      ? {
          id: data.id,
          url: data.url,
          status: this.converScanIntoSignal(data.scamProbability),
          scamProbability: data.scamProbability,
          scale: data.scale,
          conclusion: this.convertScanIntoMessage(data.scamProbability),
          keypoints: data.keypoints,
          customerReviews: data.customerReviews,
          createdAt: data.createdAt,
        }
      : null;
  }
}
