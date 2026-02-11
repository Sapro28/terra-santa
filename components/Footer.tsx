import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type SiteSettings = {
  schoolName?: string;
  footerLogos?: Array<{
    url?: string | null;
    alt?: string | null;
    link?: string | null;
  }> | null;
  footer?: {
    addressLine1?: string;
    phone?: string;
    tagline?: string;
    hoursLine1?: string;
    hoursLine2?: string;
    rights?: string;
    socialLinks?: Array<{
      platform?:
        | 'facebook'
        | 'instagram'
        | 'youtube'
        | 'tiktok'
        | 'vimeo'
        | 'linkedin'
        | 'x';
      url?: string;
    }>;
  };
};

function SocialIcon({
  platform,
  className,
}: {
  platform:
    | 'facebook'
    | 'instagram'
    | 'youtube'
    | 'tiktok'
    | 'vimeo'
    | 'linkedin'
    | 'x';
  className?: string;
}) {
  const props = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    className,
    'aria-hidden': true,
  } as const;

  switch (platform) {
    case 'facebook':
      return (
        <svg {...props}>
          <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.76-1.62 1.54V12h2.76l-.44 2.89h-2.32v6.99A10 10 0 0 0 22 12Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg {...props}>
          <path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4A5.8 5.8 0 0 1 16.2 22H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm10.65 1.5a.85.85 0 1 1 0 1.7.85.85 0 0 1 0-1.7ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg {...props}>
          <path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.8 4.6 12 4.6 12 4.6s-5.8 0-7.5.5A3 3 0 0 0 2.4 7.2 31.6 31.6 0 0 0 2 12a31.6 31.6 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.7.5 7.5.5 7.5.5s5.8 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 22 12a31.6 31.6 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...props}>
          <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21 8.65 22 10.8 22 13.6V21h-4v-6.5c0-1.55-.03-3.55-2.16-3.55-2.16 0-2.49 1.69-2.49 3.44V21h-4V9Z" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg {...props}>
          <path d="M16.6 3c.4 2.4 1.9 4 4.4 4.2v3.2c-1.7.1-3.2-.4-4.4-1.3v6.2c0 4.2-4.6 7-8.5 5.1-3.8-1.9-4-7.4-.4-9.5 1.2-.7 2.6-.9 4-.7v3.3c-.4-.1-.9-.1-1.3 0-1.3.3-2.1 1.6-1.8 2.9.3 1.4 1.9 2.3 3.3 1.8 1-.3 1.6-1.2 1.6-2.3V3h3.1Z" />
        </svg>
      );
    case 'vimeo':
      return (
        <svg {...props}>
          <path d="M22 7.2c-.1 2.9-2.2 6.9-6.3 12-2.1 2.6-3.9 3.9-5.4 3.9-1 0-1.8-.9-2.4-2.6L6.5 15c-.5-1.7-1.1-2.6-1.8-2.6-.1 0-.7.4-1.5 1.1L2 11.9c1.6-1.4 3.2-2.8 4.8-4.2 2.2-1.9 3.9-2.9 5.1-3 1.4-.1 2.3.8 2.7 2.7.4 2.1.7 3.4.8 4 .5 2.1.9 3.2 1.4 3.2.4 0 1-1 1.8-3 .8-2 .8-3.1.2-3.5-.5-.3-1.2-.2-2.1.1.8-2.6 2.4-3.9 4.8-3.8 1.8 0 2.6 1.2 2.5 3.6Z" />
        </svg>
      );
    case 'x':
      return (
        <svg {...props}>
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.7l-5.2-6.8L5.2 22H2l7.3-8.4L1 2h6.9l4.7 6.2L18.9 2Zm-1.2 18h1.7L7 3.9H5.2L17.7 20Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const t = useTranslations('Footer');
  const locale = useLocale();
  const f = settings?.footer;

  const footerLogos = (settings?.footerLogos ?? []).filter(
    (l) => (l?.url ?? '').trim().length > 0,
  );

  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    new Date(),
  );
  const name = settings?.schoolName ?? t('schoolFallback');

  const socials = (f?.socialLinks ?? [])
    .filter((s) => !!s?.url && !!s?.platform)
    .map((s) => ({
      platform: s.platform!,
      url: s.url!,
    }));

  const connectLabel =
    locale === 'ar'
      ? 'تواصل معنا'
      : locale === 'it'
        ? 'Seguici'
        : 'Connect with us';

  return (
    <footer className="border-t border-border bg-[#2b1b14] text-[#f5f0e8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Link href={`/${locale}`} className="inline-flex items-center gap-3">
            <div className="text-sm font-semibold tracking-wide text-[#f5f0e8]">
              {name}
            </div>
          </Link>

          {footerLogos.length ? (
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {footerLogos.map((l) => {
                const img = (
                  <Image
                    src={l.url!}
                    alt={l.alt ?? name}
                    width={140}
                    height={90}
                    className="h-10 w-auto object-contain opacity-90 hover:opacity-100"
                  />
                );

                const href = (l.link ?? '').trim();
                const key = `${l.url}-${l.alt ?? ''}`;
                return href ? (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  >
                    {img}
                  </a>
                ) : (
                  <div key={key} className="inline-flex">
                    {img}
                  </div>
                );
              })}
            </div>
          ) : null}
          <p className="mt-3 text-sm leading-relaxed text-[#d8cfc8]">
            {f?.addressLine1}
            {f?.addressLine1 ? <br /> : null}
            {f?.phone}
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[#d8cfc8]">
            {f?.tagline}
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold tracking-wide text-[#f5f0e8]">
            {t('hoursTitle')}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-[#d8cfc8]">
            {f?.hoursLine1}
            {f?.hoursLine1 ? <br /> : null}
            {f?.hoursLine2}
          </p>
        </div>

        {socials.length ? (
          <div>
            <div className="text-sm font-semibold tracking-wide text-[#f5f0e8]">
              {connectLabel}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={`${s.platform}-${s.url}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.platform}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f5f0e8] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <SocialIcon platform={s.platform} className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10 py-5 text-center text-xs font-semibold text-[#d8cfc8]">
        {t('copyrightTemplate', {
          year,
          name,
          rights: f?.rights ?? t('rights'),
        })}
      </div>
    </footer>
  );
}
