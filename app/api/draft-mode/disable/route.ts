import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get('redirect') || '/';

  const secret = url.searchParams.get('secret');
  if (!secret || secret !== process.env.SANITY_STUDIO_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  (await draftMode()).disable();

  const res = NextResponse.redirect(new URL(redirectTo, url.origin));
  res.cookies.set('sanity-presentation-perspective', '', {
    maxAge: 0,
    path: '/',
  });

  return res;
}
