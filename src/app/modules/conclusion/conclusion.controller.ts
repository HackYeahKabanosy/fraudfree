import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConclusionService } from './conclusion.service';
import {
  CreateConclusionDto,
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

  @Post()
  async create(
    @Body() data: CreateConclusionDto,
  ): Promise<ConclusionResponseDto> {
    return this.buildResponse(await this.conclusionService.create(data));
  }

  @Get()
  async get(@Query() data: GetConclusionDto): Promise<ConclusionResponseDto> {
    return this.buildResponse(await this.conclusionService.get(data.url));
  }

  buildResponse(data: Conclusion): ConclusionResponseDto {
    return data
      ? {
          id: data.id,
          url: data.url,
          data: data.data,
          createdAt: data.createdAt,
        }
      : null;
  }
}
