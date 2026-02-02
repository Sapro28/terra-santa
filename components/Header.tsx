import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';
import SectionsDropdownClient, {
  type SectionNavItem,
} from './sections/SectionsDropdown.client';

type CmsLink = {
  linkType?: 'internal' | 'external' | null;
  routeKey?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
};

type NavItem = {
  label?: string | null;
  link?: CmsLink | null;

  // Legacy fields (kept temporarily so old content still renders)
  navType?: 'internal' | 'external' | null;
  routeKey?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
  href?: string | null;
};

type SiteSettings = {
  schoolName?: string;
  navigation?: NavItem[];
};

function routeKeyToPathSegment(routeKey?: string | null) {
  switch (routeKey) {
    case 'home':
      return '';
    case 'about':
      return 'about';
    case 'sections':
      return 'sections';
    case 'gallery':
      return 'gallery';
    case 'news':
      return 'news';
    case 'fees':
      return 'fees';
    case 'moodle':
      return 'moodle';
    default:
      return normalizeLegacyHref(routeKey);
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

function resolveNavLink(args: {
  locale: string;
  link?: CmsLink | null;
  legacy?: Pick<
    NavItem,
    'navType' | 'routeKey' | 'externalUrl' | 'openInNewTab' | 'href'
  >;
}):
  | { kind: 'internal'; href: string; isSectionsRoot: boolean }
  | { kind: 'external'; href: string; newTab: boolean }
  | null {
  const { locale, link, legacy } = args;

  // Preferred: link object
  if (link?.linkType === 'external') {
    const href = (link.externalUrl ?? '').trim();
    if (!href) return null;
    return { kind: 'external', href, newTab: link.openInNewTab ?? true };
  }

  if (link?.linkType === 'internal') {
    const seg = routeKeyToPathSegment(link.routeKey);
    if (seg === null) return null;
    const href = seg ? `/${locale}/${seg}` : `/${locale}`;
    return {
      kind: 'internal',
      href,
      isSectionsRoot: link.routeKey === 'sections',
    };
  }

  // Legacy fallback (so old documents keep working)
  const legacyHref = legacy?.href ?? null;
  const legacyHrefIsExternal = legacyHref ? isAbsoluteUrl(legacyHref) : false;
  const isExternal = legacy?.navType === 'external' || legacyHrefIsExternal;

  if (isExternal) {
    const href = (
      legacy?.externalUrl ||
      (legacyHrefIsExternal ? legacyHref : '') ||
      ''
    ).trim();
    if (!href) return null;
    return { kind: 'external', href, newTab: legacy?.openInNewTab ?? true };
  }

  const seg = legacy?.routeKey
    ? routeKeyToPathSegment(legacy.routeKey)
    : normalizeLegacyHref(legacyHref);

  if (seg === null) return null;
  const href = seg ? `/${locale}/${seg}` : `/${locale}`;
  return {
    kind: 'internal',
    href,
    isSectionsRoot: legacy?.routeKey === 'sections',
  };
}

export default async function Header({
  locale,
  settings,
  sectionPages,
}: {
  locale: string;
  settings: SiteSettings | null;
  sectionPages?: Array<{
    title?: string | null;
    slug?: string | null;
    order?: number | null;
  }> | null;
}) {
  const nav: NavItem[] = settings?.navigation ?? [];

  const sectionDropdownItems: SectionNavItem[] = (sectionPages || [])
    .map((s) => ({
      title: (s?.title ?? '').trim(),
      slug: (s?.slug ?? '').trim(),
      order: typeof s?.order === 'number' ? s.order : 0,
    }))
    .filter((s) => s.title && s.slug)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
    )
    .map(({ title, slug }) => ({ title, slug }));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          {settings?.schoolName ?? 'School'}
        </Link>

        <div className="flex items-center gap-4">
          {nav.length > 0 ? (
            <nav className="flex items-center gap-6">
              {nav.map((item, index) => {
                const label = item?.label ?? 'Link';

                const resolved = resolveNavLink({
                  locale,
                  link: item?.link ?? null,
                  legacy: {
                    navType: item?.navType,
                    routeKey: item?.routeKey,
                    externalUrl: item?.externalUrl,
                    openInNewTab: item?.openInNewTab,
                    href: item?.href,
                  },
                });

                if (!resolved) return null;

                // If this item points to the Sections landing page, render it as a dropdown.
                // If section pages aren't configured yet, gracefully fall back to a normal link.
                if (
                  resolved.kind === 'internal' &&
                  resolved.isSectionsRoot &&
                  sectionDropdownItems.length > 0
                ) {
                  return (
                    <SectionsDropdownClient
                      key={`${label}-${index}`}
                      locale={locale}
                      label={label}
                      items={sectionDropdownItems}
                    />
                  );
                }

                if (resolved.kind === 'external') {
                  return (
                    <a
                      key={`${label}-${index}`}
                      href={resolved.href}
                      target={resolved.newTab ? '_blank' : undefined}
                      rel={resolved.newTab ? 'noreferrer noopener' : undefined}
                      className="text-sm font-semibold text-muted hover:text-(--fg)"
                    >
                      {label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={`${label}-${index}`}
                    href={resolved.href}
                    className="text-sm font-semibold text-muted hover:text-(--fg)"
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          ) : null}

          <LocaleSwitcherClient locale={locale} />
        </div>
      </div>
    </header>
  );
}
