import { draftMode } from 'next/headers';
import type { SanityClient } from 'next-sanity';
import { sanityClient, previewClient } from './client';

export async function getSanityClient(): Promise<SanityClient> {
  return (await draftMode()).isEnabled ? previewClient : sanityClient;
}
