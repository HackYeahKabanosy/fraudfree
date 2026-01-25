import axios from 'axios';
import * as cheerio from 'cheerio';

export class ScamAdviser {
  private url: string;

  async factory(url: string) {
    try {
      this.url = this.enrichUrl(url);
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

  private enrichUrl(url: string): string {
    if (!url.startsWith('https://www.scamadviser.com/check-website/') && !url.startsWith('https://www.scamadviser.com/')) {
      console.log(`https://www.scamadviser.com/check-website/${url}`);
      return `https://www.scamadviser.com/check-website/${url}`;
    }
    return url;
  }

  private parseData(html: string) {
    const $ = cheerio.load(html);
    const reviewSummary = $('[class^="quick-review-text"]').text().trim();
    const [description, totalReviews] = reviewSummary.split('based on').map(part => part.trim());
    const [rating] = description.split(' / ').map(part => part.trim());
    return {
      rating,
      totalReviews
    };
  }
}
