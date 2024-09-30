// src/app/modules/conclusion/conclusion.service.ts

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConclusionRepository } from './conclusion.repository';
import { CreateConclusionDto, ConclusionResponseDto } from './conclusion.dto';
import { PipelineService } from '../pipeline/pipeline.service';
import { Conclusion } from './conclusion.interface';
import { WeightedSum } from '../../core/utils/weighted-sum';
import { plainToInstance } from 'class-transformer';
import { ChatGpt } from './llm';
import { SiteReportService } from '../site-report/site-report.service';

@Injectable()
export class ConclusionService {
  constructor(
    private readonly siteRepository: SiteReportService,
    private readonly conclusionRepository: ConclusionRepository,
    private readonly pipelineService: PipelineService,
  ) {}

  async get(url: string): Promise<ConclusionResponseDto> {
    let conclusion = await this.conclusionRepository.get(url);

    if (!conclusion) {
      conclusion = await this.generate(url);
    }

    return this.buildResponse(conclusion);
  }

  async generate(url: string): Promise<Conclusion> {
    try {
      const pipelineResults = await this.pipelineService.execute(url);

      const scores = {
        legalKeywordsChecker:
          pipelineResults['legalKeywordsChecker']?.score || 0,
        mediaModule: pipelineResults['mediaModule']?.score || 0,
        updateDate: pipelineResults['updateDate']?.score || 0,
        trustPilotChecker: pipelineResults['trustPilotChecker']?.score || 0,
        virusTotal: pipelineResults['virusTotal']?.score || 0,
        fraudPrediction: pipelineResults['fraudPrediction']?.score || 0,
      };

      const scamProbability = WeightedSum.calculateWeightedSum(scores);

      const reports = await this.siteRepository.getReportsByUrl(url);

      const conclusionChatGpt = await new ChatGpt().factory(
        JSON.stringify(reports),
      );

      const oClonclusionGpt = JSON.parse(conclusionChatGpt);

      const conclusionData: CreateConclusionDto = {
        url,
        scamProbability,
        scale: '0-10',
        conclusion: conclusionChatGpt.conclusion,
        keypoints: oClonclusionGpt.keypoints || {},
        customerReviews: pipelineResults['trustPilotChecker'] || {},
      };

      const conclusion = await this.create(conclusionData);

      return conclusion;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to generate conclusion');
    }
  }

  private buildResponse(data: Conclusion): ConclusionResponseDto {
    const status = this.convertScamProbabilityToStatus(data.scamProbability);
    const statusMessage = this.convertScamProbabilityToMessage(
      data.scamProbability,
    );

    return plainToInstance(ConclusionResponseDto, {
      ...data,
      status,
      statusMessage,
    });
  }

  private convertScamProbabilityToStatus(scamProbability: number): string {
    if (scamProbability < 2) {
      return 'Safe';
    } else if (scamProbability < 4) {
      return 'Ok';
    } else if (scamProbability < 6) {
      return 'Warning';
    } else {
      return 'Danger';
    }
  }

  private convertScamProbabilityToMessage(scamProbability: number): string {
    if (scamProbability < 2) {
      return 'This e-commerce site has a strong reputation and is confirmed to be legitimate. You can browse and make purchases with confidence.';
    } else if (scamProbability < 4) {
      return 'This website appears trustworthy based on its domain history and online reputation. If it’s a marketplace, it’s a good idea to check the credibility of the individual seller.';
    } else if (scamProbability < 6) {
      return "This website raises some concerns. It’s important to verify its authenticity, especially if you haven't heard of this store before. Look for well-known brand indicators and be cautious when sharing personal information.";
    } else {
      return 'This website shows multiple signs of being a potential scam. Information is limited or unclear, and there are several red flags that suggest it may not be safe to use. Proceed with extreme caution, or avoid using this site altogether.';
    }
  }

  private async create(data: CreateConclusionDto): Promise<Conclusion> {
    return await this.conclusionRepository.create(data);
  }
}
