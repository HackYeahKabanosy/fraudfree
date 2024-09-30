// src/app/utils/weighted-sum.ts

export class WeightedSum {
  private static weights = {
    legalKeywordsChecker: 1,
    mediaModule: 2,
    updateDate: 1.3,
    trustPilotChecker: 2.1,
  };

  static calculateWeightedSum(scores: { [key: string]: number }): number {
    let weightedSum = 0;
    let totalWeights = 0;

    for (const [key, score] of Object.entries(scores)) {
      const weight = this.weights[key] || 1;
      weightedSum += score * weight;
      totalWeights += weight;
    }

    return totalWeights !== 0
      ? parseFloat((weightedSum / totalWeights).toFixed(4))
      : 0;
  }
}
