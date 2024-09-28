import { Injectable } from '@nestjs/common';
import { ConclusionRepository } from './conclusion.repository';
import { CreateConclusionDto, ConclusionResponseDto } from './conclusion.dto';

@Injectable()
export class ConclusionService {
  constructor(private readonly conclusionRepository: ConclusionRepository) {}

  async generate(url: string) {
    return `${url} not implemented`;
  }

  async create(data: CreateConclusionDto): Promise<ConclusionResponseDto> {
    return this.conclusionRepository.create(data);
  }

  async get(id: string): Promise<ConclusionResponseDto> {
    return this.conclusionRepository.get(id);
  }
}
