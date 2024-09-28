import * as mongoose from 'mongoose';
import { Conclusion } from './conclusion.interface';

export const ConclusionSchema = new mongoose.Schema<Conclusion>({
  url: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});
