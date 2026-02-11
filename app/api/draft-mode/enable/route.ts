import { draftMode } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { previewClient } from '@/sanity/lib/client';

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const redirect = request.nextUrl.searchParams.get('redirect') || '/';

  if (!secret) {
    return new Response('No secret provided', { status: 400 });
  }

  if (!process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return new Response('Preview secret not configured on server', {
      status: 500,
    });
  }

  if (secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 });
  }

  if (!previewClient) {
    return new Response('Preview client not configured', { status: 500 });
  }

  try {
    const draft = await draftMode();
    draft.enable();

    const url = new URL(redirect, request.url);
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Error enabling draft mode:', error);
    return new Response(
      'Error enabling draft mode: ' + (error as Error).message,
      {
        status: 500,
      },
    );
  }
}
