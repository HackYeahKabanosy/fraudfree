// src/app/modules/provider/providers/media-module.ts

import * as cheerio from 'cheerio';

export class MediaModule {
  async factory(url: string, dependencies: any) {
    try {
      const htmlParseResult = dependencies['htmlParse'];
      let htmlContent: string;

      if (htmlParseResult && htmlParseResult.html) {
        htmlContent = htmlParseResult.html;
      } else {
        throw new Error('HTML content not available from htmlParse provider');
      }

      const $ = cheerio.load(htmlContent);

      const socialMediaPatterns = [
        /instagram\.com\/[A-Za-z0-9_.]+\/?/i,
        /facebook\.com\/[A-Za-z0-9_.]+\/?/i,
        /twitter\.com\/[A-Za-z0-9_.]+\/?/i,
      ];

      const links = $('a[href]')
        .map((_, el) => $(el).attr('href'))
        .get()
        .filter((href) =>
          socialMediaPatterns.some((pattern) => pattern.test(href)),
        );

      const validLinks = links.filter((link) =>
        socialMediaPatterns.some((pattern) => pattern.test(link)),
      );

      let score = 0.5; // Default score
      if (validLinks.length > 0) {
        score = 1;
      } else {
        score = 0;
      }

      return {
        socialMediaLinks: validLinks,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during media check',
      };
    }
  }
}
