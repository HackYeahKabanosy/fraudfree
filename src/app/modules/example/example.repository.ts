import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { documentToObject } from 'src/app/core/utils/database';
import { Example } from './example.interface';
import { CreateExampleDto, ExampleResponseDto } from './example.dto';

@Injectable()
export class ExampleRepository {
  constructor(
    @InjectModel('Example')
    private readonly exampleModel: Model<Example>,
  ) {}

  public async create(data: CreateExampleDto): Promise<ExampleResponseDto> {
    return documentToObject<ExampleResponseDto>(
      await this.exampleModel.create(data),
    );
  }

  async get(id: string): Promise<ExampleResponseDto> {
    return documentToObject<ExampleResponseDto>(
      await this.exampleModel.findById(id),
    );
  }

  async list(): Promise<ExampleResponseDto[]> {
    return documentToObject<ExampleResponseDto[]>(
      await this.exampleModel.find(),
    );
  }

  async update(
    id: string,
    data: CreateExampleDto,
  ): Promise<ExampleResponseDto> {
    return documentToObject<ExampleResponseDto>(
      await this.exampleModel.findByIdAndUpdate(id, data, { new: true }),
    );
  }

  async delete(id: string): Promise<ExampleResponseDto> {
    return documentToObject<ExampleResponseDto>(
      await this.exampleModel.findByIdAndDelete(id),
    );
  }
}
