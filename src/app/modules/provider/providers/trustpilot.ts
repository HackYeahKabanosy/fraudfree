import axios from 'axios';
import * as cheerio from 'cheerio';

export class Trustpilot {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  async factory() {
    try {
      const response = await this.fetchPageData(this.url);
      const parsedData = this.parseData(response.data);
      return parsedData;
    } catch (error) {
      return {
        crawledUrl: this.url,
        error: error.message || 'Error during request',
      };
    }
  }

  private async fetchPageData(url: string) {
    const response = await axios.get(url);
    return response;
  }

  private parseData(html: string) {
    const $ = cheerio.load(html);
    const rating = $('[data-rating-typography]').text().trim();
    const companyName = $('[class^="typography_display"]').text().trim();
    const trustScore = $('img[alt^="TrustScore"]').attr('alt')?.split(' ')[1] ?? '';
    const reviewSummary = $('[class^="styles_clickable"] span').text().trim();
    const [totalReviews, ratingDescription] = reviewSummary.split('•').map(part => part.trim());

    return {
      companyName,
      totalReviews,
      trustScore,
      ratingDescription,
      rating,
    };
  }
}
