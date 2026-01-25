import { defineLive } from 'next-sanity/live';
import { sanityClient } from './client';

const token = process.env.SANITY_VIEWER_TOKEN;

export const { sanityFetch, SanityLive } = defineLive({
  client: sanityClient,
  serverToken: token,
  browserToken: token,
});
