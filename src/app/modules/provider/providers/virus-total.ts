// src/app/modules/provider/providers/virus-total.ts

import axios from 'axios';

export class VirusTotal {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.VT_SECRET_KEY;
  }

  async factory(url: string) {
    try {
      const domain = new URL(url).hostname;

      const apiUrl = `https://www.virustotal.com/api/v3/domains/${domain}`;

      const response = await axios.get(apiUrl, {
        headers: {
          accept: 'application/json',
          'x-apikey': this.apiKey,
        },
      });

      const data = response.data;

      // Extract relevant information
      const maliciousVotes = data.data.attributes.last_analysis_stats.malicious;
      const suspiciousVotes =
        data.data.attributes.last_analysis_stats.suspicious;
      const harmlessVotes = data.data.attributes.last_analysis_stats.harmless;

      // Example scoring logic
      const totalVotes = maliciousVotes + suspiciousVotes + harmlessVotes;
      const score = (maliciousVotes + suspiciousVotes) / totalVotes;

      return {
        maliciousVotes,
        suspiciousVotes,
        harmlessVotes,
        score,
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during VirusTotal check',
      };
    }
  }
}
