import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { Example } from './example.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponseDto implements Example {
  @IsDefined()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  object: object;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  string: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  number: number;
}

export class CreateExampleDto implements Example {
  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: {
      key: 'value',
    },
  })
  object: object;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'string',
  })
  string: string;

  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 1,
  })
  number: number;
}

export class GetExampleDto {
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '1',
  })
  id: string;
}
