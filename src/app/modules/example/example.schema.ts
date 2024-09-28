import * as mongoose from 'mongoose';
import { Example } from './example.interface';

export const ExampleSchema = new mongoose.Schema<Example>({
  object: { type: Object, required: true },
  string: { type: String, required: true },
  number: { type: Number, required: true },
});
