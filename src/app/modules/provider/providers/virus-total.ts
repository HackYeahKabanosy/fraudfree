import axios from 'axios';
import { config } from 'src/config/config';

export class VirusTotal {
  private apiKey: string;

  constructor() {
    // Store your VirusTotal API key
    this.apiKey = config.vtSecret;
  }

  async factory(url: string) {
    try {
      const response = await this.requestData(url);
      return response.data.data;
    } catch (error) {
      return {
        analyzedUrl: url,
        error: error.message || 'Error during request',
      };
    }
  }

  private async requestData(domain: string) {
    const apiUrl = `https://www.virustotal.com/api/v3/domains/${domain}`;

    // Make a GET request using Axios
    const response = await axios.get(apiUrl, {
      headers: {
        accept: 'application/json',
        'x-apikey': this.apiKey,
      },
    });

    return response;
  }
}
