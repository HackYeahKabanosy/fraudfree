// src/app/modules/provider/providers/fraud-prediction.ts

import { InferenceSession, Tensor } from 'onnxruntime-node';
import * as path from 'path';

export class FraudPrediction {
  private modelPath: string;

  constructor() {
    this.modelPath = path.join(__dirname, 'model.onnx');
  }

  async factory(url: string) {
    try {
      // Initialize the session with the ONNX model
      const session = await InferenceSession.create(this.modelPath);

      // Preprocess the URL into a format suitable for the model
      const feeds = await this.preprocess(url);

      // Run the model
      const results = await session.run(feeds);

      // Extract the output
      // Assuming the output variable name is 'output' or check your model's output name
      const outputTensor = results[session.outputNames[0]];
      const probSafe = outputTensor.data[0];

      return {
        score: probSafe,
      };
    } catch (error) {
      console.error('Error during fraud prediction:', error);
      return {
        url,
        error: error.message || 'Error during fraud prediction',
      };
    }
  }

  private async preprocess(url: string): Promise<{ [name: string]: Tensor }> {
    // Check if string tensors are supported
    if (!InferenceSession.supportsType('string')) {
      // Handle the case where string tensors are not supported
      // You may need to encode the string into numbers (e.g., character codes)
      throw new Error(
        'String tensors are not supported in this ONNX Runtime version.',
      );
    }

    // Create a tensor with the URL string
    const urlTensor = new Tensor('string', [url], [1]);

    // The input name should match the model's input name
    const inputName = 'inputs'; // Replace with your model's actual input name

    return { [inputName]: urlTensor };
  }
}
