import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { documentToObject } from 'src/app/core/utils/database';
import { Conclusion } from './conclusion.interface';
import { CreateConclusionDto, ConclusionResponseDto } from './conclusion.dto';

@Injectable()
export class ConclusionRepository {
  constructor(
    @InjectModel('Conclusion')
    private readonly conclusionModel: Model<Conclusion>,
  ) {}

  public async create(
    data: CreateConclusionDto,
  ): Promise<ConclusionResponseDto> {
    return documentToObject<ConclusionResponseDto>(
      await this.conclusionModel.create(data),
    );
  }

  async get(url: string): Promise<Conclusion> {
    return await this.conclusionModel.findOne({ url });
  }
}
