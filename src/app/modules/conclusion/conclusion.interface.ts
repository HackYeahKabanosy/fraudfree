export interface Conclusion {
  id?: string;
  url: string;
  scamProbability: number;
  scale: string;
  conclusion: string;
  keypoints: object;
  createdAt: Date;
}
