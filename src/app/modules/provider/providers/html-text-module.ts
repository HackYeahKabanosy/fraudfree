// src/app/modules/provider/providers/html-text-module.ts

import * as cheerio from 'cheerio';

export class HtmlTextModule {
  async factory(url: string, dependencies: any) {
    try {
      const htmlParseResult = dependencies['htmlParse'];
      let htmlContent: string;

      if (htmlParseResult && htmlParseResult.html) {
        // Use the parsed HTML from htmlParse provider
        htmlContent = htmlParseResult.html;
      } else {
        throw new Error('HTML content not available from htmlParse provider');
      }

      const $ = cheerio.load(htmlContent);
      const textContent = $('body').text();

      return {
        textContent,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during HTML text extraction',
      };
    }
  }
}
