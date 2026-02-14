import { PortableText } from '@portabletext/react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

type ImageLink = {
  url?: string | null;
  alt?: string | null;
  link?: string | null;
};

type FooterColumn = {
  title?: string | null;
  body?: any;
  links?: Array<{ label?: string | null; url?: string | null } | null> | null;
  images?: Array<ImageLink | null> | null;
};

type FooterData = {
  brandName?: string | null;
  brandLogo?: { url?: string | null; alt?: string | null } | null;
  leftText?: any;
  rights?: string | null;
  bottomLinks?: Array<{
    label?: string | null;
    url?: string | null;
  } | null> | null;
  columns?: Array<FooterColumn | null> | null;
  socialLinks?: Array<{
    platform?:
      | 'facebook'
      | 'instagram'
      | 'youtube'
      | 'tiktok'
      | 'vimeo'
      | 'linkedin'
      | 'x'
      | null;
    url?: string | null;
  } | null> | null;
};

type SiteSettings = {
  footer?: FooterData | null;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || /^\/\//.test(href);
}

function SocialIcon({
  platform,
  className,
}: {
  platform: NonNullable<
    NonNullable<FooterData['socialLinks']>[number]
  >['platform'];
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

function FooterColumnBlock({ column }: { column: FooterColumn }) {
  const title = (column.title ?? '').trim();
  const links = (column.links ?? [])
    .map((l) => ({
      label: (l?.label ?? '').trim(),
      url: (l?.url ?? '').trim(),
    }))
    .filter((l) => !!l.label && !!l.url);

  const images = (column.images ?? [])
    .map((img) => ({
      url: (img?.url ?? '').trim(),
      alt: (img?.alt ?? '').trim(),
      link: (img?.link ?? '').trim(),
    }))
    .filter((img) => !!img.url);

  return (
    <div>
      {title ? (
        <div className="text-sm font-semibold tracking-wide text-[#f5f0e8]">
          {title}
        </div>
      ) : null}

      {column.body ? (
        <div className="mt-3 text-sm leading-relaxed text-[#d8cfc8] [&_a]:underline [&_a]:decoration-white/25 [&_a:hover]:decoration-white/60">
          <PortableText value={column.body} />
        </div>
      ) : null}

      {links.length ? (
        <ul className="mt-4 space-y-2 text-sm text-[#d8cfc8]">
          {links.map((l) => {
            const external = isExternalHref(l.url);
            return (
              <li key={`${l.label}-${l.url}`}>
                <a
                  href={l.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="inline-flex leading-relaxed underline decoration-white/25 underline-offset-4 transition hover:text-[#f5f0e8] hover:decoration-white/60"
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      ) : null}

      {images.length ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          {images.map((img) => {
            const imageEl = (
              <Image
                src={img.url}
                alt={img.alt || title || 'Footer image'}
                width={160}
                height={100}
                className="h-10 w-auto object-contain opacity-90 hover:opacity-100"
              />
            );

            return img.link ? (
              <a
                key={`${img.url}-${img.link}`}
                href={img.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {imageEl}
              </a>
            ) : (
              <div key={img.url} className="inline-flex">
                {imageEl}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function Footer({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  const t = useTranslations('Footer');
  const locale = useLocale();

  const year = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    new Date(),
  );
  const f = settings?.footer ?? null;

  const name = (f?.brandName ?? '').trim();

  const logo = f?.brandLogo
    ? {
        url: (f.brandLogo.url ?? '').trim(),
        alt: (f.brandLogo.alt ?? '').trim(),
      }
    : null;

  const socials = (f?.socialLinks ?? [])
    .map((s) => ({
      platform: s?.platform ?? null,
      url: (s?.url ?? '').trim(),
    }))
    .filter((s) => !!s.platform && !!s.url) as Array<{
    platform: NonNullable<
      NonNullable<NonNullable<FooterData['socialLinks']>[number]>['platform']
    >;
    url: string;
  }>;

  const bottomLinks = (f?.bottomLinks ?? [])
    .map((l) => ({
      label: (l?.label ?? '').trim(),
      url: (l?.url ?? '').trim(),
    }))
    .filter((l) => !!l.label && !!l.url);

  const columnsFromSanity = (f?.columns ?? [])
    .filter(Boolean)
    .map((c) => c as FooterColumn)
    .filter((c) => (c.title ?? '').trim().length > 0 || !!c.body);
  const columnsToRender = columnsFromSanity;

  return (
    <footer className="border-t border-border bg-[#6F4E37] text-[#f5f0e8]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_1px_minmax(0,2fr)]">
          <div>
            <Link
              href={`/${locale}`}
              className="inline-flex items-center gap-3"
            >
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || name}
                  width={200}
                  height={120}
                  className="h-12 w-auto object-contain"
                  priority={false}
                />
              ) : (
                <div className="text-base font-semibold tracking-wide text-[#f5f0e8]">
                  {name}
                </div>
              )}
            </Link>

            <div className="mt-4 space-y-3">
              <div className="text-sm font-semibold tracking-wide text-[#f5f0e8]">
                {name}
              </div>

              {f?.leftText ? (
                <div className="text-sm leading-relaxed text-[#d8cfc8] [&_a]:underline [&_a]:decoration-white/25 [&_a:hover]:decoration-white/60">
                  <PortableText value={f.leftText} />
                </div>
              ) : null}

              {socials.length ? (
                <div className="flex flex-wrap gap-3 pt-1">
                  {socials.map((s) => (
                    <a
                      key={`${s.platform}-${s.url}`}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-[#f5f0e8] transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <SocialIcon
                        platform={s.platform}
                        className="h-4.5 w-4.5"
                      />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="hidden md:block bg-white/10" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {columnsToRender.map((c, idx) => (
              <FooterColumnBlock
                key={`${c.title ?? 'col'}-${idx}`}
                column={c}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs font-semibold text-[#d8cfc8] md:flex-row md:items-center md:justify-between">
          {bottomLinks.length ? (
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {bottomLinks.map((l) => {
                const external = isExternalHref(l.url);
                return (
                  <a
                    key={`${l.label}-${l.url}`}
                    href={l.url}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="underline decoration-white/20 underline-offset-4 transition hover:text-[#f5f0e8] hover:decoration-white/60"
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          ) : (
            <span />
          )}

          <div className="text-left md:text-right">
            {t('copyrightTemplate', {
              year,
              name,
              rights: f?.rights ?? t('rights'),
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
