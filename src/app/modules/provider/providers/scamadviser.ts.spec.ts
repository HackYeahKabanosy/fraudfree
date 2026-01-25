import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { ScamAdviser } from './ScamAdviser';
import * as cheerio from 'cheerio';

describe('ScamAdviser', () => {
  let scamAdviser: ScamAdviser;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    scamAdviser = new ScamAdviser();
    mockAxios = new MockAdapter(axios);

    // Mock console.log to avoid seeing logs during the test
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    mockAxios.reset();
    jest.restoreAllMocks(); // Restore console.log and other mocks after each test
  });

  describe('factory method', () => {

    it('should return an error message when the request fails', async () => {
      const fakeUrl = 'example.com';
      const enrichedUrl = 'https://www.scamadviser.com/check-website/example.com';
      const errorMessage = 'Network Error';

      mockAxios.onGet(enrichedUrl).networkError();

      const result = await scamAdviser.factory(fakeUrl);

      expect(result).toEqual({
        crawledUrl: enrichedUrl,
        error: errorMessage,
      });
    });
  });

  describe('enrichUrl method', () => {
    it('should add ScamAdviser URL if not present', () => {
      const result = scamAdviser['enrichUrl']('example.com');
      expect(result).toBe('https://www.scamadviser.com/check-website/example.com');
    });

    it('should not modify URL if already in ScamAdviser format', () => {
      const existingUrl = 'https://www.scamadviser.com/check-website/example.com';
      const result = scamAdviser['enrichUrl'](existingUrl);
      expect(result).toBe(existingUrl);
    });
  });

  describe('parseData method', () => {
    it('should extract rating and total reviews from the HTML', () => {
      const fakeHtml = '<div class="quick-review-text">85 / 100 based on 200 reviews</div>';
      const $ = cheerio.load(fakeHtml);
      const result = scamAdviser['parseData'](fakeHtml);
      expect(result).toEqual({
        rating: '85',
        totalReviews: '200 reviews',
      });
    });
  });
});
