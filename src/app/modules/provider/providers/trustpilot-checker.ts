// src/app/modules/provider/providers/trustpilot-checker.ts

import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export class TrustPilotChecker {
  private reviewBaseUrl = 'https://www.trustpilot.com/review/';

  async factory(url: string) {
    try {
      const domain = this.extractDomain(url);
      const trustpilotUrl = `${this.reviewBaseUrl}${domain}`;

      const response = await axios.get(trustpilotUrl);
      const html = response.data;
      const $ = cheerio.load(html);

      const ratingText = $('div[data-rating-typography]').text().trim();
      const totalReviewsText = $('span.typography_body-l__KUYFJ').text().trim();

      const rating = parseFloat(ratingText) || 0;
      const totalReviews =
        parseInt(totalReviewsText.replace(/[^0-9]/g, '')) || 0;

      const score = rating / 5; // Normalize to 0-1 scale

      return {
        companyName: domain,
        rating,
        totalReviews,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during TrustPilot check',
      };
    }
  }

  private extractDomain(url: string): string {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace(/^www\./, '');
  }
}
