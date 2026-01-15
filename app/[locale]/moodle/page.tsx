import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function MoodlePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Moodle' });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-(--muted)">{t('subtitle')}</p>
      </header>

      <div className="rounded-3xl border border-(--border) bg-white p-6">
        <p className="text-sm text-(--muted)">{t('placeholder')}</p>

        <div className="mt-4 flex gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
          >
            {t('backHome')}
          </Link>

          {/* <a
            href="#"
            className="rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)"
          >
            {t('openLater')}
          </a> */}
        </div>
      </div>
    </div>
  );
}
