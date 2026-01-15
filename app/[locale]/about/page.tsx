import { getTranslations } from 'next-intl/server';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="max-w-3xl text-(--muted)">{t('intro')}</p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard
          title={t('cards.missionTitle')}
          text={t('cards.missionText')}
        />
        <InfoCard title={t('cards.visionTitle')} text={t('cards.visionText')} />
        <InfoCard title={t('cards.valuesTitle')} text={t('cards.valuesText')} />
      </section>

      <section className="rounded-3xl border border-(--border) bg-white p-6 md:p-8">
        <h2 className="text-2xl font-bold">{t('leadership.title')}</h2>
        <p className="mt-2 text-(--muted)">{t('leadership.subtitle')}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-(--border) bg-white p-5"
            >
              <div className="aspect-square w-full rounded-xl bg-(--paper)" />
              <div className="mt-4">
                <div className="font-semibold">
                  {t('leadership.personName')}
                </div>
                <div className="text-sm font-semibold text-(--muted)">
                  {t('leadership.personRole')}
                </div>
                <p className="mt-2 text-sm text-(--muted)">
                  {t('leadership.personBio')}
                </p>
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
