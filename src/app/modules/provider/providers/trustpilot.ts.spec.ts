import axios from 'axios';
import { TrustPilot } from './TrustPilot';  // Adjust path if necessary

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
  });

  describe('factory', () => {
    it('should fetch and parse data correctly', async () => {
      const html = `
        <div data-rating-typography="true">4.5</div>
        <span class="typography_display-s__qOjh6">Amazon</span>
        <img alt="TrustScore 4.5 out of 5">
        <span role="link" tabindex="0" class="styles_clickable__zQWyh"><span class="typography_body-l__KUYFJ typography_appearance-subtle__8_H2l styles_text__W4hWi">163&nbsp;  •  &nbsp;Bad</span></span>
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

    it('should handle request errors gracefully', async () => {
      // Mock axios.get to throw an error
      (axios.get as jest.Mock).mockRejectedValue(new Error('Request failed'));

      const result = await trustPilot.factory('invalidurl.com');

      expect(result).toEqual({
        crawledUrl: 'https://www.trustpilot.com/review/invalidurl.com',
        error: 'Request failed',
      });
    });
  });
});
