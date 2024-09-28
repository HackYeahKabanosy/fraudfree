import { IsDefined, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { SiteReport } from './site-report.interface';
import { ApiProperty } from '@nestjs/swagger';

export class SiteReportResponseDto implements SiteReport {
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
  @IsString()
  @ApiProperty({
    type: String,
    example: 'virustotal',
  })
  provider: string;

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

export class CrawlerSiteReportDto
  implements Omit<SiteReport, 'createdAt' | 'data' | 'provider'>
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

export class CreateSiteReportDto implements Omit<SiteReport, 'createdAt'> {
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
  @IsString()
  @ApiProperty({
    type: String,
    example: 'virustotal',
  })
  provider: string;

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

export class GetSiteReportDto {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    example: 'amazon.com',
  })
  url: string;
}
