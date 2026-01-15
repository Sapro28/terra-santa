import { getTranslations } from 'next-intl/server';

export default async function SectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sections' });

  const sections = [
    {
      title: t('list.primary.title'),
      age: t('list.primary.age'),
      desc: t('list.primary.desc'),
    },
    {
      title: t('list.middle.title'),
      age: t('list.middle.age'),
      desc: t('list.middle.desc'),
    },
    {
      title: t('list.secondary.title'),
      age: t('list.secondary.age'),
      desc: t('list.secondary.desc'),
    },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-3xl text-(--muted)">{t('subtitle')}</p>
      </header>

      <div className="grid gap-4">
        {sections.map((s) => (
          <div
            key={s.title}
            className="rounded-3xl border border-(--border) bg-white p-6 md:p-8"
          >
            <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
              <h2 className="text-2xl font-bold">{s.title}</h2>
              <p className="text-sm font-semibold text-(--muted)">{s.age}</p>
            </div>

            <p className="mt-4 max-w-3xl text-(--muted)">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
