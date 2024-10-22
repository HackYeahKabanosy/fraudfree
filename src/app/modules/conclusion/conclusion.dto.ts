import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
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
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 7,
  })
  scamProbability: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '0-10',
  })
  scale: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example:
      'The domain was created on 11/01/1994, indicating it has been around for a long time.',
  })
  conclusion: string;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: [
      {
        title: 'Domain Age and Registration',
        detail:
          'The domain was created on 11/01/1994, indicating it has been around for a long time.',
      },
      {
        title: 'Registrar Information',
        detail:
          'The domain is registered with MarkMonitor Inc., which is a reputable registrar.',
      },
    ],
  })
  keypoints: object;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: {
      companyName: 'Amazon',
      totalReviews: '33,417',
      trustScore: '1.5',
      ratingDescription: 'Bad',
      rating: '1.7',
    },
  })
  customerReviews: object;

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
  implements
    Omit<
      Conclusion,
      'createdAt' | 'scamProbability' | 'scale' | 'conclusion' | 'keypoints'
    >
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
  @IsNumber()
  @ApiProperty({
    type: Number,
    example: 7,
  })
  scamProbability: number;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: '0-10',
  })
  scale: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example:
      'The domain was created on 11/01/1994, indicating it has been around for a long time.',
  })
  conclusion: string;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: [
      {
        title: 'Domain Age and Registration',
        detail:
          'The domain was created on 11/01/1994, indicating it has been around for a long time.',
      },
      {
        title: 'Registrar Information',
        detail:
          'The domain is registered with MarkMonitor Inc., which is a reputable registrar.',
      },
    ],
  })
  keypoints: object;

  @IsDefined()
  @IsNotEmpty()
  @IsObject()
  @ApiProperty({
    type: Object,
    example: {
      companyName: 'Amazon',
      totalReviews: '33,417',
      trustScore: '1.5',
      ratingDescription: 'Bad',
      rating: '1.7',
    },
  })
  customerReviews: object;
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
