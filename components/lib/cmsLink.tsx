import Link from 'next/link';

export type CMSLink = {
  linkType?: 'internal' | 'external' | null;
  routeKey?: string | null;
  internalPath?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
};

function routeKeyToPathSegment(routeKey?: string | null) {
  switch (routeKey) {
    case 'home':
      return '';
    case 'about':
      return 'about';
    case 'sections':
      return 'sections';
    case 'news':
      return 'news';
    case 'events':
      return 'events';
    case 'fees':
      return 'fees';
    case 'moodle':
      return 'moodle';
    default:
      return null;
  }
}

function isAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function normalizeLegacyHref(raw?: string | null) {
  if (!raw) return '';
  const trimmed = raw.trim();
  if (!trimmed) return '';
  return trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
}

export function resolveCmsLink(args: {
  locale: string;
  link?: CMSLink | null;
  legacyHref?: string | null;
}):
  | { kind: 'internal'; href: string }
  | { kind: 'external'; href: string; newTab: boolean }
  | null {
  const { locale, link, legacyHref } = args;

  if (link?.linkType === 'external') {
    const href = (link.externalUrl ?? '').trim();
    if (!href) return null;
    return { kind: 'external', href, newTab: link.openInNewTab ?? true };
  }

  if (link?.linkType === 'internal') {
    const raw = (link.internalPath ?? '').trim();
    const seg = raw
      ? normalizeLegacyHref(raw)
      : routeKeyToPathSegment(link.routeKey);
    if (seg === null) return null;
    return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
  }

  if (legacyHref) {
    const raw = legacyHref.trim();
    if (!raw) return { kind: 'internal', href: `/${locale}` };
    if (isAbsoluteUrl(raw))
      return { kind: 'external', href: raw, newTab: true };

    const seg = normalizeLegacyHref(raw);
    return { kind: 'internal', href: seg ? `/${locale}/${seg}` : `/${locale}` };
  }

  return null;
}

export function CmsCtaLink({
  resolved,
  label,
  className,
}: {
  resolved:
    | { kind: 'internal'; href: string }
    | { kind: 'external'; href: string; newTab: boolean };
  label: string;
  className: string;
}) {
  if (resolved.kind === 'external') {
    return (
      <a
        href={resolved.href}
        target={resolved.newTab ? '_blank' : undefined}
        rel={resolved.newTab ? 'noreferrer noopener' : undefined}
        className={className}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={resolved.href} className={className}>
      {label}
    </Link>
  );
}
