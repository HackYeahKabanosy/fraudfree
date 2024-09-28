import axios from 'axios';
import { config } from 'src/config/config';

export class ChatGpt {
  private apiKey: string;

  constructor() {
    // Store your OpenAI GPT API key
    this.apiKey = config.gptSecret;
  }

  async factory(prompt: string) {
    try {
      const response = await this.requestData(prompt);
      return response.data.choices[0].message.content; // Get the content of the assistant's response
    } catch (error) {
      console.error('Error making request to OpenAI:', error);
      return { error: error.message || 'Error during request' };
    }
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
