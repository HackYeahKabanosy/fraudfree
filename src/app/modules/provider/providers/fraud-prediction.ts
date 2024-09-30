// src/app/modules/provider/providers/fraud-prediction.ts

import * as ort from 'onnxruntime-node';
import * as path from 'path';

export class FraudPrediction {
  private modelPath: string;

  constructor() {
    this.modelPath = path.join(__dirname, 'model.onnx');
  }

  async factory(url: string) {
    try {
      const session = await ort.InferenceSession.create(this.modelPath);

      // Get model input and output names
      const inputName = session.inputNames[0];
      const outputName = session.outputNames[1]; // Adjust the index if needed

      console.log('Model Input Name:', inputName);
      console.log('Model Output Name:', outputName);

      // Prepare the input tensor
      const inputTensor = new ort.Tensor('string', [url], [1]);

      // Create the feeds object for the session run
      const feeds = {};
      feeds[inputName] = inputTensor;

      // Run inference
      const results = await session.run(feeds);

      // Access the output tensor
      const outputTensor = results[outputName];
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
}
