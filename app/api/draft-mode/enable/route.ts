import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get('secret');
  const redirectTo = url.searchParams.get('redirect') || '/';

  if (secret !== process.env.DRAFT_MODE_SECRET) {
    return new NextResponse('Invalid secret', { status: 401 });
  }

  (await draftMode()).enable();
  return NextResponse.redirect(new URL(redirectTo, url.origin));
}
