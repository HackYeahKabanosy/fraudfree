import { Module } from '@nestjs/common';
import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ExampleSchema } from './example.schema';
import { ExampleRepository } from './example.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Example', schema: ExampleSchema }]),
  ],
  controllers: [ExampleController],
  providers: [ExampleService, ExampleRepository],
})
export class ExampleModule {}
