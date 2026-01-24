import { getSanityClient } from '@/sanity/lib/getClient';

import { sectionsPageQuery } from '@/sanity/lib/queries';

type SectionsPageContent = {
  title?: string;
  subtitle?: string;
  sections?: Array<{ title?: string; age?: string; desc?: string }>;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function SectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<SectionsPageContent | null>(
    sectionsPageQuery,
    {
      lang,
    },
  );

  return (
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{page?.title ?? 'Sections'}</h1>
        {page?.subtitle ? (
          <p className="text-(--muted)">{page.subtitle}</p>
        ) : null}
      </header>

      {page?.sections?.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {page.sections.map((s, idx) => (
            <div
              key={`${s.title ?? 'section'}-${idx}`}
              className="rounded-3xl border border-(--border) bg-white p-6"
            >
              <div className="font-semibold">{s.title ?? '—'}</div>
              {s.age ? (
                <div className="mt-1 text-xs text-(--muted)">{s.age}</div>
              ) : null}
              {s.desc ? (
                <p className="mt-3 text-sm text-(--muted)">{s.desc}</p>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-(--muted)">No sections yet.</p>
      )}
    </main>
  );
}
