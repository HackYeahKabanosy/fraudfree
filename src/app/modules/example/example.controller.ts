import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExampleService } from './example.service';
import {
  CreateExampleDto,
  ExampleResponseDto,
  GetExampleDto,
} from './example.dto';
import { Example } from './example.interface';

@ApiTags('example')
@Controller('example')
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Post()
  async create(@Body() data: CreateExampleDto): Promise<ExampleResponseDto> {
    return this.exampleService.create(data);
  }

  @Get()
  async get(@Query() data: GetExampleDto): Promise<ExampleResponseDto> {
    return this.exampleService.get(data.id);
  }

  @Get('list')
  async list(): Promise<ExampleResponseDto[]> {
    return this.exampleService.list();
  }

  @Put()
  async update(
    @Query() data: GetExampleDto,
    @Body() body: CreateExampleDto,
  ): Promise<ExampleResponseDto> {
    return this.exampleService.update(data.id, body);
  }

  @Delete()
  async delete(@Query() data: GetExampleDto): Promise<ExampleResponseDto> {
    return this.exampleService.delete(data.id);
  }

  buildExampleResponse(data: Example): ExampleResponseDto {
    return data
      ? {
          id: data.id,
          object: data.object,
          string: data.string,
          number: data.number,
        }
      : null;
  }
}
