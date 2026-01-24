import NewsletterForm from './NewsletterForm';

type SiteSettings = {
  schoolName?: string;
  footer?: {
    addressLine1?: string;
    phone?: string;
    tagline?: string;
    hoursTitle?: string;
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
  const f = settings?.footer;

  return (
    <footer className="border-t border-(--border) bg-(--paper)">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <div className="text-sm font-semibold text-(--fg)">
            {settings?.schoolName ?? 'School'}
          </div>
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
            {f?.hoursTitle}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-(--muted)">
            {f?.hoursLine1}
            {f?.hoursLine1 ? <br /> : null}
            {f?.hoursLine2}
          </p>

          <NewsletterForm />
        </div>
      </div>

      <div className="border-t border-(--border) py-5 text-center text-xs font-semibold text-(--muted)">
        © {new Date().getFullYear()} {settings?.schoolName ?? 'School'}.{' '}
        {f?.rights ?? ''}
      </div>
    </footer>
  );
}
