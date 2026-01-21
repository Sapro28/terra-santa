import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function FeesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Fees' });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="text-(--muted)">{t('subtitle')}</p>
      </header>

      <div className="rounded-3xl border border-(--border) bg-white p-6 space-y-4">
        <p className="text-sm text-(--muted)">{t('intro')}</p>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-semibold">
              {t('items.registration.title')}
            </span>{' '}
            — {t('items.registration.desc')}
          </p>
          <p>
            <span className="font-semibold">{t('items.tuition.title')}</span> —{' '}
            {t('items.tuition.desc')}
          </p>
          <p>
            <span className="font-semibold">{t('items.transport.title')}</span>{' '}
            — {t('items.transport.desc')}
          </p>
          <p>
            <span className="font-semibold">{t('items.activities.title')}</span>{' '}
            — {t('items.activities.desc')}
          </p>
        </div>

        <div className="rounded-2xl border border-(--border) bg-(--paper) p-4">
          <p className="text-sm font-semibold">{t('noteTitle')}</p>
          <p className="text-sm text-(--muted) mt-1">{t('noteBody')}</p>
        </div>

        <div className="mt-2 flex gap-3">
          <Link
            href={`/${locale}`}
            className="rounded-xl border border-(--border) bg-white px-4 py-2 text-sm font-semibold hover:bg-(--paper)"
          >
            {t('backHome')}
          </Link>

          <a
            href="#"
            className="rounded-xl bg-(--accent) px-4 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)"
          >
            {t('contactUs')}
          </a>
        </div>
      </div>
    </div>
  );
}
