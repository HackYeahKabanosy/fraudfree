export interface Conclusion {
  id?: string;
  url: string;
  scamProbability: number;
  customerReviews?: object;
  scale: string;
  conclusion: string;
  keypoints: object;
  createdAt: Date;
}
