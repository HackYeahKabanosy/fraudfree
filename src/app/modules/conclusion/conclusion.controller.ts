import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConclusionService } from './conclusion.service';
import { ConclusionResponseDto, GetConclusionDto } from './conclusion.dto';
import { Conclusion } from './conclusion.interface';
import { extractDomain } from 'src/app/core/utils/url-parser';

@ApiTags('Conclusion')
@Controller('conclusions')
export class ConclusionController {
  constructor(private readonly conclusionService: ConclusionService) {}

  @Get()
  async get(@Query() data: GetConclusionDto): Promise<ConclusionResponseDto> {
    // Normalize the URL
    const domain = extractDomain(data.url);

    if (!domain) {
      throw new HttpException('Invalid URL provided', HttpStatus.BAD_REQUEST);
    }

    const conclusion = await this.conclusionService.get(domain);

    if (!conclusion) {
      throw new HttpException('Conclusion not found', HttpStatus.NOT_FOUND);
    }

    return conclusion;
  }

  buildResponse(data: Conclusion): ConclusionResponseDto {
    return data
      ? {
          id: data.id,
          url: data.url,
          scamProbability: data.scamProbability,
          customerReviews: data.customerReviews,
          scale: data.scale,
          conclusion: data.conclusion,
          keypoints: data.keypoints,
          createdAt: data.createdAt,
        }
      : null;
  }
}
