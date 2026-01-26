import { useTranslations, useLocale } from 'next-intl';

type SiteSettings = {
  schoolName?: string;
  footer?: {
    addressLine1?: string;
    phone?: string;
    tagline?: string;
    hoursLine1?: string;
    hoursLine2?: string;
    rights?: string;
  };
};

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const f = settings?.footer;

  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    new Date(),
  );
  const name = settings?.schoolName ?? t('schoolFallback'); // add this key or keep 'School'

  return (
    <footer className="border-t border-(--border) bg-(--paper)">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="text-sm font-semibold text-(--fg)">{name}</div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {f?.addressLine1}
            {f?.addressLine1 ? <br /> : null}
            {f?.phone}
          </p>
          <p className="mt-4 text-xs font-semibold text-(--muted)">
            {f?.tagline}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold text-(--fg)">
            {t('hoursTitle')}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {f?.hoursLine1}
            {f?.hoursLine1 ? <br /> : null}
            {f?.hoursLine2}
          </p>
        </div>
      </div>

      <div className="border-t border-(--border) py-5 text-center text-xs font-semibold text-(--muted)">
        {t('copyrightTemplate', {
          year,
          name,
          rights: f?.rights ?? t('rights'),
        })}
      </div>
    </footer>
  );
}
