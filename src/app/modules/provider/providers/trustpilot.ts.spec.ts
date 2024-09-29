import axios from 'axios';
import { TrustPilot } from './trustpilot';

jest.mock('axios');

describe('TrustPilot Class', () => {
  let trustPilot: TrustPilot;

  beforeEach(() => {
    trustPilot = new TrustPilot();
  });

  describe('enrichUrl', () => {
    it('should enrich a basic URL by adding TrustPilot review URL', () => {
      const inputUrl = 'amazon.pl';
      const enrichedUrl = trustPilot['enrichUrl'](inputUrl);
      expect(enrichedUrl).toBe('https://www.trustpilot.com/review/amazon.pl');
    });

    it('should not modify a URL that already has TrustPilot review URL', () => {
      const inputUrl = 'https://www.trustpilot.com/review/amazon.pl';
      const enrichedUrl = trustPilot['enrichUrl'](inputUrl);
      expect(enrichedUrl).toBe(inputUrl);
    });

    it('should not modify a URL that already starts with TrustPilot domain', () => {
      const inputUrl = 'https://www.trustpilot.com/otherpage';
      const enrichedUrl = trustPilot['enrichUrl'](inputUrl);
      expect(enrichedUrl).toBe(inputUrl);
    });

    it('should handle URLs without schema', () => {
      const inputUrl = 'www.trustpilot.com/review/amazon.pl';
      const enrichedUrl = trustPilot['enrichUrl'](inputUrl);
      expect(enrichedUrl).toBe('https://www.trustpilot.com/review/www.trustpilot.com/review/amazon.pl');
    });
  });

  describe('factory', () => {
    it('should fetch and parse data correctly', async () => {
      const html = `
        <div data-rating-typography="true">4.5</div>
        <span class="typography_display-s__qOjh6">Amazon</span>
        <img alt="TrustScore 4.5 out of 5">
        <span class="styles_clickable__zQWyh">
          <span class="typography_body-l__KUYFJ typography_appearance-subtle__8_H2l styles_text__W4hWi">163&nbsp;  •  &nbsp;Bad</span>
        </span>
      `;

      (axios.get as jest.Mock).mockResolvedValue({ data: html });

      const data = await trustPilot.factory('amazon.pl');

      expect(data).toEqual({
        companyName: 'Amazon',
        totalReviews: '163',
        trustScore: '4.5',
        ratingDescription: 'Bad',
        rating: '4.5',
      });
    });

    it('should handle missing ratingDescription gracefully', async () => {
      const html = `
        <div data-rating-typography="true">4.5</div>
        <span class="typography_display-s__qOjh6">Amazon</span>
        <img alt="TrustScore 4.5 out of 5">
        <span class="styles_clickable__zQWyh"><span class="typography_body-l__KUYFJ typography_appearance-subtle__8_H2l styles_text__W4hWi">163&nbsp;  •  &nbsp;</span></span>
      `;

      (axios.get as jest.Mock).mockResolvedValue({ data: html });

      const data = await trustPilot.factory('amazon.pl');

      expect(data).toEqual({
        companyName: 'Amazon',
        totalReviews: '163',
        trustScore: '4.5',
        ratingDescription: 'no customer reviews for this site', // default message
        rating: '4.5',
      });
    });

    it('should handle case with no total reviews', async () => {
      const html = `
        <div data-rating-typography="true">4.5</div>
        <span class="typography_display-s__qOjh6">Amazon</span>
        <img alt="TrustScore 4.5 out of 5">
        <span class="styles_clickable__zQWyh"><span class="typography_body-l__KUYFJ typography_appearance-subtle__8_H2l styles_text__W4hWi">  •  &nbsp;Bad</span></span>
      `;

      (axios.get as jest.Mock).mockResolvedValue({ data: html });

      const data = await trustPilot.factory('amazon.pl');

      expect(data).toEqual({
        companyName: 'Amazon',
        totalReviews: '', // no total reviews
        trustScore: '4.5',
        ratingDescription: 'Bad',
        rating: '4.5',
      });
    });

    it('should handle request errors gracefully', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('Request failed'));

      const result = await trustPilot.factory('invalidurl.com');

      expect(result).toEqual({
        crawledUrl: 'https://www.trustpilot.com/review/invalidurl.com',
        error: 'Request failed',
      });
    });
  });
});
