import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'y31mzuku',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-03-28',
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
