import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3000/studio';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: { studioUrl },
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
  perspective: 'drafts',
  stega: { studioUrl },
});
