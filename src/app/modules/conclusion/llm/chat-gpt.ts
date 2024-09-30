import axios from 'axios';
import { config } from 'src/config/config';

export class ChatGpt {
  private apiKey: string;

  constructor() {
    // Store your OpenAI GPT API key
    this.apiKey = config.gptSecret;
  }

  async factory(reports: string) {
    try {
      const response = await this.requestData(await this.promptize(reports));
      return response.data.choices[0].message.content; // Get the content of the assistant's response
    } catch (error) {
      console.error('Error making request to OpenAI:', error);
      return { error: error.message || 'Error during request' };
    }
  }

  async promptize(reports: any): Promise<any> {
    const data = JSON.stringify(reports);

    const prompt = `You are an AI assistant tasked with assessing the legitimacy of an e-commerce website based on multi-layered data reports. Analyze the following data carefully:

${data}

Guidelines:

- **TrustPilot Reviews**: While customer reviews are important, consider that popular sites may receive a mix of positive and negative reviews due to their large user base.

- **VirusTotal and Security Reports**: Prioritize data indicating malware, phishing, or other security threats.

- **WHOIS and Domain Age**: Older domains are generally more trustworthy.

- **HTML and Content Analysis**: Check for signs of poor website construction, language errors, or missing content.

- **Consistency**: Cross-reference all data layers to check for consistency.

Based on the analysis, generate a scam probability score between 0 (very safe) and 10 (very risky). Provide the following in a JSON object (without code blocks):

- **url**: The website URL.
- **scamProbability**: A number between 0 and 10.
- **scale**: "0-10"
- **ranking**: One of "Safe", "Ok", "Warning", or "Danger".
- **conclusion**: A brief natural language summary.
- **keypoints**: A object of key findings from each provider, from data.
- **customerReviews**: Summarize customer reviews if available.

Note: Be objective and consider the overall reputation and data consistency. Well-known sites like "amazon.com" are generally safe despite some negative reviews.

Return only the JSON object as a string.`;

    return prompt;
  }

  private async requestData(prompt: string) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    // Make a POST request to OpenAI's API with the prompt and required headers
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7, // Optional: Control the randomness of the output
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
      },
    );

    return response;
  }
}
