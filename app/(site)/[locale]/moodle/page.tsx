import Link from 'next/link';
import { getSanityClient } from '@/sanity/lib/getClient';
import { moodlePageQuery } from '@/sanity/lib/queries';

type MoodlePageContent = {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  backHomeLabel?: string;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function MoodlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<MoodlePageContent | null>(moodlePageQuery, {
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

      <div className="rounded-3xl border border-(--border) bg-white p-6">
        {page?.placeholder ? (
          <p className="text-sm text-(--muted)">{page.placeholder}</p>
        ) : null}

        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
          >
            {page?.backHomeLabel ?? 'Back home'}
          </Link>
        </div>
      </div>
    </div>
  );
}
