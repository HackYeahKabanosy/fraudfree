// src/app/modules/provider/providers/update-date.ts

import axios from 'axios';

export class UpdateDate {
  async factory(url: string) {
    try {
      const response = await axios.head(url);
      const lastModified = response.headers['last-modified'];

      let score = 0.5; // Default score
      if (lastModified) {
        const lastModifiedDate = new Date(lastModified);
        const now = new Date();
        const diffInDays =
          (now.getTime() - lastModifiedDate.getTime()) / (1000 * 3600 * 24);

        // Example scoring function: more recent updates get higher scores
        score = 1 / (1 + Math.exp(-(diffInDays - 250) / 50));
      }

      return {
        lastModified,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during update date check',
      };
    }
  }
}
