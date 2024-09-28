import { Injectable } from '@nestjs/common';
import { ConclusionRepository } from './conclusion.repository';
import { CreateConclusionDto, ConclusionResponseDto } from './conclusion.dto';
import { SiteReportService } from '../site-report/site-report.service';
import { SiteReportResponseDto } from '../site-report/site-report.dto';
import { ChatGpt } from './llm/chat-gpt';
import { Conclusion } from './conclusion.interface';

@Injectable()
export class ConclusionService {
  constructor(
    private readonly conclusionRepository: ConclusionRepository,
    private readonly siteReportService: SiteReportService,
  ) {}

  async generate(url: string) {
    const reports: SiteReportResponseDto[] =
      await this.siteReportService.get(url);
    if (reports.length === 0) {
      return `No reports found for ${url}`;
    }

    try {
      const sumarizedObj = await this.summarize(reports);
      await this.create(JSON.parse(sumarizedObj));
      return `${url} new conclusion generated`;
    } catch (error) {
      return `Error generating conclusion for ${url}`;
    }
  }

  async summarize(report: SiteReportResponseDto[]): Promise<string> {
    const data = report.toString().trim();
    const prompt = `Based on the follow report give me a probability from 0 to 10 of this ecommerce be a scam, return me a json with the follow fields: url, scamProbability, scale should be a string "0-10", conclusion, keypoints(Domain Age and Registration, Registrar Information, WHOIS Information, Reputation Score, Domain Status, Recent Updates), please give me the json as string withut any codeblock: ${data}`;
    const llm = new ChatGpt();
    const response = await llm.factory(JSON.stringify(prompt));
    return response;
  }

  async create(data: CreateConclusionDto): Promise<ConclusionResponseDto> {
    return this.conclusionRepository.create(data);
  }

  async get(url: string): Promise<Conclusion> {
    return this.conclusionRepository.get(url);
  }
}
