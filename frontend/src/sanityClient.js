import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'y31mzuku',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-28',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
