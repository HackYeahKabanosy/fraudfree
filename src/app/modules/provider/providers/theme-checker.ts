// src/app/modules/provider/providers/theme-checker.ts

import * as natural from 'natural';
const TfIdf = natural.TfIdf;
import skmeans from 'skmeans';

export class ThemeChecker {
  async factory(url: string, dependencies: any) {
    try {
      const htmlTextResult = dependencies['htmlTextModule'];
      const textContent = htmlTextResult?.textContent || '';

      const documents = this.splitText(textContent, 5);

      const tfidf = new TfIdf();
      documents.forEach((doc) => tfidf.addDocument(doc));

      const terms = [];
      tfidf.documents.forEach((doc) => {
        Object.keys(doc).forEach((term) => {
          if (!terms.includes(term)) terms.push(term);
        });
      });

      const vectors = [];
      for (let i = 0; i < documents.length; i++) {
        const vec = [];
        terms.forEach((term) => {
          vec.push(tfidf.tfidf(term, i));
        });
        vectors.push(vec);
      }

      const clusters = skmeans(vectors, 3);

      // Extract top terms from clusters
      const themes = new Set<string>();
      clusters.centroids.forEach((centroid) => {
        const topIndices = centroid
          .map((value, index) => ({ value, index }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 2)
          .map((item) => item.index);

        topIndices.forEach((index) => themes.add(terms[index]));
      });

      return {
        themes: Array.from(themes),
      };
    } catch (error) {
      return {
        url,
        error: error.message || 'Error during theme checking',
      };
    }
  }

  private splitText(text: string, parts: number): string[] {
    const words = text.split(/\s+/);
    const chunkSize = Math.ceil(words.length / parts);
    const chunks = [];
    for (let i = 0; i < words.length; i += chunkSize) {
      chunks.push(words.slice(i, i + chunkSize).join(' '));
    }
    return chunks;
  }
}
