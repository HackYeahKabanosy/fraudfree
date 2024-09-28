import { Module } from '@nestjs/common';
import { ConclusionController } from './conclusion.controller';
import { ConclusionService } from './conclusion.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConclusionSchema } from './conclusion.schema';
import { ConclusionRepository } from './conclusion.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conclusion', schema: ConclusionSchema },
    ]),
  ],
  controllers: [ConclusionController],
  providers: [ConclusionService, ConclusionRepository],
})
export class ConclusionModule {}
