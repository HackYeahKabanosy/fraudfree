// src/app/modules/provider/providers/trustpilot-checker.ts

import axios from 'axios';
import * as cheerio from 'cheerio';

export interface TrustPilotData {
  companyName: string;
  totalReviews: string;
  trustScore: string;
  ratingDescription: string;
  rating: number;
}

export class TrustPilotChecker {
  private url: string;

  async factory(url: string) {
    try {
      this.url = this.enrichUrl(url);
      const response = await this.fetchPageData(this.url);
      const parsedData = this.parseData(response.data);

      const score = parsedData.rating / 5;

      return {
        companyName: url,
        rating: parsedData.rating,
        totalReviews: parsedData.totalReviews,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during TrustPilot check',
      };
    }
  }

  private async fetchPageData(url: string) {
    const response = await axios.get(url);
    return response;
  }

  private enrichUrl(url: string): string {
    if (
      !url.startsWith('https://www.trustpilot.com/review/') &&
      !url.startsWith('https://www.trustpilot.com/')
    ) {
      return `https://www.trustpilot.com/review/${url}`;
    }
    return url;
  }

  private parseData(html: string): TrustPilotData {
    const $ = cheerio.load(html);
    const rating = $('[data-rating-typography]').text().trim();
    const companyName = $('[class^="typography_display"]').text().trim();
    const trustScore =
      $('img[alt^="TrustScore"]').attr('alt')?.split(' ')[1] ?? '';
    const reviewSummary = $('[class^="styles_clickable"] span').text().trim();
    const [totalReviews, ratingDescription] = reviewSummary
      .split('•')
      .map((part) => part.trim());

    const finalRatingDescription =
      ratingDescription || 'no customer reviews for this site';

    return {
      companyName,
      totalReviews,
      trustScore,
      ratingDescription: finalRatingDescription,
      rating: parseFloat(rating),
    };
  }
}
