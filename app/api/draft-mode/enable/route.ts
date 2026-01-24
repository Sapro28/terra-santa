import { defineEnableDraftMode } from 'next-sanity/draft-mode';
import { previewClient } from '@/sanity/lib/client';

const handler = defineEnableDraftMode({ client: previewClient });

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');

  if (!secret || secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  return handler.GET(req);
}
