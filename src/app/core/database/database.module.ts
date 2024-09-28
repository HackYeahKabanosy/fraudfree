import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './database.provider';
import { config } from 'src/config/config';

@Module({
  imports: [MongooseModule.forRoot(config.mongoUrl)],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
