import { defineLive } from 'next-sanity/live';
import { liveClient } from './client';

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
  serverToken: token,
  browserToken: token,
});
