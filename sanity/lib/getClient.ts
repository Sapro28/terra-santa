import { draftMode } from 'next/headers';
import { sanityClient, previewClient } from './client';

export async function getSanityClient() {
  return (await draftMode()).isEnabled ? previewClient : sanityClient;
}
