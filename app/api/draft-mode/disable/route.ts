import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const redirectTo = url.searchParams.get('redirect') || '/';

  (await draftMode()).disable();
  return NextResponse.redirect(new URL(redirectTo, url.origin));
}
