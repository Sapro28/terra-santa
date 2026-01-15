'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="border-t border-(--border) bg-(--paper)">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="text-sm font-semibold text-(--fg)">
            {t('schoolName')}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {t('addressLine1')}
            <br />
            {t('phone')}
          </p>
          <p className="mt-4 text-xs font-semibold text-(--muted)">
            {t('tagline')}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-(--fg)">{t('hours')}</div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {t('hoursLine1')}
            <br />
            {t('hoursLine2')}
          </p>

          <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-[color:var(--border)]">
            <p className="text-xs font-semibold text-(--muted)">
              {t('newsletter.title')}
            </p>
            <p className="mt-1 text-sm font-semibold text-(--fg)">
              {t('newsletter.subtitle')}
            </p>
            <div className="mt-3 flex gap-2">
              <input
                className="w-full rounded-xl border border-(--border) bg-white px-3 py-2 text-sm outline-none placeholder:text-(--muted) focus:border-(--accent)"
                placeholder={t('newsletter.placeholder')}
              />
              <button className="rounded-xl bg-(--accent) px-3 py-2 text-sm font-semibold text-white hover:bg-(--accent-hover)">
                {t('newsletter.button')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-(--border) py-5 text-center text-xs font-semibold text-(--muted)">
        © {new Date().getFullYear()} {t('schoolName')}. {t('rights')}
      </div>
    </footer>
  );
}
