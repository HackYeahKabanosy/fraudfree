import { Injectable } from '@nestjs/common';
import { ExampleRepository } from './example.repository';
import { CreateExampleDto, ExampleResponseDto } from './example.dto';

@Injectable()
export class ExampleService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async create(data: CreateExampleDto): Promise<ExampleResponseDto> {
    return this.exampleRepository.create(data);
  }

  async get(id: string): Promise<ExampleResponseDto> {
    return this.exampleRepository.get(id);
  }

  async list(): Promise<ExampleResponseDto[]> {
    return this.exampleRepository.list();
  }

  async update(
    id: string,
    data: CreateExampleDto,
  ): Promise<ExampleResponseDto> {
    return this.exampleRepository.update(id, data);
  }

  async delete(id: string): Promise<ExampleResponseDto> {
    return this.exampleRepository.delete(id);
  }
}
