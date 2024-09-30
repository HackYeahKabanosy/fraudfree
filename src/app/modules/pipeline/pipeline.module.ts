// src/app/modules/pipeline/pipeline.module.ts

import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [ProviderModule],
  providers: [PipelineService],
  exports: [PipelineService],
})
export class PipelineModule {}
