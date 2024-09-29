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

  buildResponse(data: Conclusion): ConclusionResponseDto {
    return data
      ? {
          id: data.id,
          url: data.url,
          status: this.converScanIntoSignal(data.scamProbability),
          scamProbability: data.scamProbability,
          scale: data.scale,
          conclusion: data.conclusion,
          keypoints: data.keypoints,
          customerReviews: data.customerReviews,
          createdAt: data.createdAt,
        }
      : null;
  }
}
