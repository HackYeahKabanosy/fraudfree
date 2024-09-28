import { IsDefined, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { Conclusion } from './conclusion.interface';
import { ApiProperty } from '@nestjs/swagger';

export class ConclusionResponseDto implements Conclusion {
  @IsDefined()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'amazon.com',
  })
  url: string;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: {
      score: 1.0,
      trust: 'high',
    },
  })
  data: object;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '2021-08-25T17:00:00.000Z',
  })
  createdAt: Date;
}

export class GenerateConclusionDto
  implements Omit<Conclusion, 'createdAt' | 'data'>
{
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'amazon.com',
  })
  url: string;
}

export class CreateConclusionDto implements Omit<Conclusion, 'createdAt'> {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'amazon.com',
  })
  url: string;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: {
      score: 1.0,
      trust: 'high',
    },
  })
  data: object;
}

export class GetConclusionDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'amazon.com',
  })
  url: string;
}
