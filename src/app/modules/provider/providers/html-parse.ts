// src/app/modules/provider/providers/html-parse.ts

import axios from 'axios';

export class HTMLParse {
  async factory(url: string) {
    try {
      const response = await axios.get(url);
      const html = response.data;

      return {
        html,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during HTML parsing',
      };
    }
  }
}
