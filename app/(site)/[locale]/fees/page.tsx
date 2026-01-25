import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';

import { feesPageQuery } from '@/sanity/lib/queries';

type FeesPageContent = {
  title?: string;
  subtitle?: string;
  intro?: string;
  items?: Array<{ title?: string; desc?: string }>;
  noteTitle?: string;
  noteBody?: string;
  backHomeLabel?: string;
  contactUsLabel?: string;
  contactUsUrl?: string;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function FeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<FeesPageContent | null>(feesPageQuery, {
    lang,
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{page?.title ?? '—'}</h1>
        {page?.subtitle ? (
          <p className="text-(--muted)">{page.subtitle}</p>
        ) : null}
      </header>

      <div className="rounded-3xl border border-(--border) bg-white p-6 space-y-4">
        {page?.intro ? (
          <p className="text-sm text-(--muted)">{page.intro}</p>
        ) : null}

        {page?.items?.length ? (
          <div className="space-y-2 text-sm">
            {page.items.map((it, idx) => (
              <p key={`${it.title ?? 'item'}-${idx}`}>
                <span className="font-semibold">{it.title ?? '—'}</span>
                {it.desc ? <> — {it.desc}</> : null}
              </p>
            ))}
          </div>
        ) : null}

        {page?.noteTitle || page?.noteBody ? (
          <div className="rounded-2xl border border-(--border) bg-(--paper) p-4">
            {page?.noteTitle ? (
              <p className="text-sm font-semibold">{page.noteTitle}</p>
            ) : null}
            {page?.noteBody ? (
              <p className="text-sm text-(--muted) mt-1">{page.noteBody}</p>
            ) : null}
          </div>
        ) : null}

        <div className="mt-2 flex gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
          >
            {page?.backHomeLabel ?? 'Back home'}
          </Link>

          <a
            href={page?.contactUsUrl ?? '#'}
            className="rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)"
          >
            {page?.contactUsLabel ?? 'Contact us'}
          </a>
        </div>
      </div>
    </div>
  );
}
