import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  return (
    <div className="space-y-16">
      <section className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-(--border) bg-(--paper) px-3 py-1 text-xs font-semibold text-(--muted)">
            {t('badge')}
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            {t('welcome')}{' '}
            <span className="text-(--fg)">{t('schoolName')}</span>
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-(--muted)">
            {t('subtitle')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/${locale}/about`}
              className="rounded-xl bg-(--accent) px-5 py-3 text-sm font-semibold text-white hover:bg-(--accent-hover)"
            >
              {t('ctaAbout')}
            </Link>

            <Link
              href={`/${locale}/gallery`}
              className="rounded-xl border border-(--border) bg-white px-5 py-3 text-sm font-semibold text-(--fg) hover:bg-(--paper)"
            >
              {t('ctaGallery')}
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 rounded-2xl border border-(--border) bg-white p-4">
            <Stat label={t('stats.students')} value="—" />
            <Stat label={t('stats.teachers')} value="—" />
            <Stat label={t('stats.years')} value="—" />
          </div>
        </div>

        <div className="relative">
          <div className="aspect-4/3 w-full rounded-3xl border border-(--border) bg-linear-to-br from-[#fbf8f3] to-[#efe6dc]" />
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/90 p-4 ring-1 ring-(--border) backdrop-blur">
            <p className="text-sm font-semibold">{t('nextEvent.title')}</p>
            <p className="mt-1 text-sm text-(--muted)">{t('nextEvent.desc')}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <InfoCard
          title={t('cards.missionTitle')}
          text={t('cards.missionText')}
        />
        <InfoCard title={t('cards.visionTitle')} text={t('cards.visionText')} />
        <InfoCard title={t('cards.valuesTitle')} text={t('cards.valuesText')} />
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-(--paper) p-3 text-center">
      <div className="text-xl font-bold">{value}</div>
      <div className="mt-1 text-xs font-semibold text-(--muted)">{label}</div>
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
