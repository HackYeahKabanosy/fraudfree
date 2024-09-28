import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ExampleModule } from './modules/example/example.module';

@Module({
  imports: [DatabaseModule, ExampleModule],
})
export class AppModule {}
