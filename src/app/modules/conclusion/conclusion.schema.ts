import * as mongoose from 'mongoose';
import { Conclusion } from './conclusion.interface';

export const ConclusionSchema = new mongoose.Schema<Conclusion>({
  url: { type: String, required: true },
  scamProbability: { type: Number, required: true },
  scale: { type: String, required: true },
  conclusion: { type: String },
  keypoints: { type: Object, required: false },
  customerReviews: { type: Object, required: false },
  createdAt: { type: Date, default: Date.now },
});
