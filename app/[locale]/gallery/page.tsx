import { getTranslations } from 'next-intl/server';

const items = Array.from({ length: 9 }).map((_, i) => ({
  titleKey: 'itemTitle',
  descKey: 'itemDesc',
  number: i + 1,
}));

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Gallery' });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-3xl text-(--muted)">{t('subtitle')}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div
            key={it.number}
            className="overflow-hidden rounded-2xl border border-(--border) bg-white"
          >
            <div className="aspect-4/3 bg-(--paper)" />
            <div className="p-5">
              <div className="font-semibold">
                {t(it.titleKey, { n: it.number })}
              </div>
              <p className="mt-2 text-sm text-(--muted)">{t(it.descKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
