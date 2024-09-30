import { URL } from 'url';

export function extractDomain(url: string): string {
  try {
    let normalizedUrl = url.trim();

    // Add protocol if missing
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = 'http://' + normalizedUrl;
    }

    const parsedUrl = new URL(normalizedUrl);
    let hostname = parsedUrl.hostname.toLowerCase();

    // Remove 'www.' prefix if present
    if (hostname.startsWith('www.')) {
      hostname = hostname.slice(4);
    }

    return hostname;
  } catch (error) {
    console.error('Error parsing URL:', error.message);
    return null;
  }
}
