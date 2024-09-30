export interface SiteReport {
  id?: string;
  url: string;
  provider: string;
  layer: string;
  data: object;
  createdAt: Date;
}
