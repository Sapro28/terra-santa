import { useTranslations } from 'next-intl';
import NewsletterForm from './NewsletterForm';

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

          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-(--border) py-5 text-center text-xs font-semibold text-(--muted)">
        © {new Date().getFullYear()} {t('schoolName')}. {t('rights')}
      </div>
    </footer>
  );
}
