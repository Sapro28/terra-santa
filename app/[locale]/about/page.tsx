import { getSanityClient } from '@/sanity/lib/getClient';

import { aboutPageQuery } from '@/sanity/lib/queries';

type AboutPageContent = {
  title?: string;
  intro?: string;
  cards?: Array<{ title?: string; text?: string }>;
  leadershipTitle?: string;
  leadershipSubtitle?: string;
  leadershipPeople?: Array<{
    name?: string;
    role?: string;
    bio?: string;
    imageUrl?: string;
    imageAlt?: string;
  }>;
};

function localeToLang(locale: string) {
  if (locale === 'ar') return 'ar';
  if (locale === 'it') return 'it';
  return 'en';
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lang = localeToLang(locale);

  const client = await getSanityClient();
  const page = await client.fetch<AboutPageContent | null>(aboutPageQuery, {
    lang,
  });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{page?.title ?? '—'}</h1>
        {page?.intro ? (
          <p className="max-w-3xl text-(--muted)">{page.intro}</p>
        ) : null}
      </header>

      {page?.cards?.length ? (
        <section className="grid gap-4 md:grid-cols-3">
          {page.cards.slice(0, 3).map((c, idx) => (
            <InfoCard key={idx} title={c.title ?? '—'} text={c.text ?? ''} />
          ))}
        </section>
      ) : null}

      <section className="rounded-3xl border border-(--border) bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold">{page?.leadershipTitle ?? '—'}</h2>
        {page?.leadershipSubtitle ? (
          <p className="mt-2 text-(--muted)">{page.leadershipSubtitle}</p>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(page?.leadershipPeople ?? []).map((p, idx) => (
            <div
              key={`${p.name ?? 'person'}-${idx}`}
              className="rounded-2xl border border-(--border) bg-white p-5"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl bg-(--paper)">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.imageAlt || p.name || 'Person'}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : null}
              </div>

              <div className="mt-4">
                <div className="font-semibold">{p.name ?? '—'}</div>
                {p.role ? (
                  <div className="text-sm font-semibold text-(--muted)">
                    {p.role}
                  </div>
                ) : null}
                {p.bio ? (
                  <p className="mt-2 text-sm text-(--muted)">{p.bio}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-(--border) bg-white p-5">
      <div className="font-semibold">{title}</div>
      <p className="mt-2 text-sm text-(--muted)">{text}</p>
    </div>
  );
}
