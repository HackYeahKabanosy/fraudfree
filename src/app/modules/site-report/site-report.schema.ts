import * as mongoose from 'mongoose';
import { SiteReport } from './site-report.interface';

export const SiteReportSchema = new mongoose.Schema<SiteReport>({
  url: { type: String, required: true },
  data: { type: Object, required: true },
  provider: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
