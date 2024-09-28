import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConclusionService } from './conclusion.service';
import {
  ConclusionResponseDto,
  GetConclusionDto,
  GenerateConclusionDto,
} from './conclusion.dto';
import { Conclusion } from './conclusion.interface';

@ApiTags('Conclusion')
@Controller('Conclusion')
export class ConclusionController {
  constructor(private readonly conclusionService: ConclusionService) {}

  @Post('generate')
  async generate(@Body() data: GenerateConclusionDto) {
    return await this.conclusionService.generate(data.url);
  }

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
          createdAt: data.createdAt,
        }
      : null;
  }
}
