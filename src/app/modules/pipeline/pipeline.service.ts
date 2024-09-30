// src/app/modules/pipeline/pipeline.service.ts

import { Injectable } from '@nestjs/common';
import { ProviderService } from '../provider/provider.service';

@Injectable()
export class PipelineService {
  constructor(private readonly providerService: ProviderService) {}

  async execute(url: string): Promise<any> {
    // Define the pipeline execution order and dependencies
    const pipeline = [
      { name: 'legalKeywordsChecker', dependencies: [] },
      { name: 'htmlParse', dependencies: [] },
      { name: 'htmlTextModule', dependencies: ['htmlParse'] },
      { name: 'themeChecker', dependencies: ['htmlTextModule'] },
      { name: 'mediaModule', dependencies: ['htmlParse'] },
      { name: 'updateDate', dependencies: [] },
      { name: 'trustPilotChecker', dependencies: [] },
    ];

    const results = {};

    for (const step of pipeline) {
      const { name: providerName, dependencies: dependencyNames } = step;

      const dependencies = dependencyNames.reduce((deps, depName) => {
        deps[depName] = results[depName];
        return deps;
      }, {});

      const providerResult = await this.providerService.executeProvider(
        providerName,
        url,
        dependencies,
      );

      results[providerName] = providerResult;
    }

    return results;
  }
}
