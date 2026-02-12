import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-11';

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
}
if (!dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET');
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const liveClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'drafts',
});

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_VIEWER_TOKEN,
  perspective: 'drafts',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
});

if (!process.env.SANITY_VIEWER_TOKEN) {
  console.warn(
    'Warning: SANITY_VIEWER_TOKEN is not set. Draft mode will not work properly.',
  );
}
