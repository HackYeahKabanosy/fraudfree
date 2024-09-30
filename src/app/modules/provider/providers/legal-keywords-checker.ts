// src/app/modules/provider/providers/legal-keywords-checker.ts

import axios from 'axios';
import * as cheerio from 'cheerio';

export class LegalKeywordsChecker {
  private legalTerms = ['terms of service', 'return policy', 'privacy policy'];

  async factory(url: string) {
    try {
      const httpsUsed = url.startsWith('https://');

      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const pageText = $('body').text().toLowerCase();

      const legalTermsFound = this.legalTerms.some((term) =>
        pageText.includes(term),
      );

      let score = 0;
      if (httpsUsed) score += 0.25;
      if (legalTermsFound) score += 0.25;

      return {
        httpsUsed,
        legalTermsFound,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during legal keywords check',
      };
    }
  }
}
