import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';

type NavItem = {
  navType?: 'internal' | 'external' | null;
  routeKey?: string | null;
  externalUrl?: string | null;
  openInNewTab?: boolean | null;
  label?: string | null;

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
    case 'album':
      return 'album';
    case 'news':
      return 'news';
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
  return raw.startsWith('/') ? raw.slice(1) : raw;
}

export default async function Header({
  locale,
  settings,
}: {
  locale: string;
  settings: SiteSettings | null;
}) {
  const nav: NavItem[] = settings?.navigation ?? [
    { navType: 'internal', routeKey: 'home', label: 'Home' },
    { navType: 'internal', routeKey: 'about', label: 'About' },
    { navType: 'internal', routeKey: 'sections', label: 'Sections' },
    { navType: 'internal', routeKey: 'album', label: 'Album' },
    { navType: 'internal', routeKey: 'news', label: 'News' },
    { navType: 'internal', routeKey: 'fees', label: 'Fees' },
    { navType: 'internal', routeKey: 'moodle', label: 'Moodle' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          {settings?.schoolName ?? 'School'}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item, index) => {
              const label = item?.label ?? 'Link';

              const legacyHref = item?.href ?? null;
              const legacyHrefNorm = normalizeLegacyHref(legacyHref);
              const legacyHrefIsExternal = legacyHref
                ? isAbsoluteUrl(legacyHref)
                : false;

              const isExternal =
                item?.navType === 'external' || legacyHrefIsExternal;

              if (isExternal) {
                const url =
                  item?.externalUrl ||
                  (legacyHrefIsExternal ? legacyHref! : '');
                const openNew = item?.openInNewTab ?? true;

                if (!url) return null;

                return (
                  <a
                    key={`${label}-${index}`}
                    href={url}
                    target={openNew ? '_blank' : undefined}
                    rel={openNew ? 'noreferrer noopener' : undefined}
                    className="text-sm font-semibold text-(--muted) hover:text-(--fg)"
                  >
                    {label}
                  </a>
                );
              }

              let seg: string | null = null;

              if (item?.routeKey) {
                seg = routeKeyToPathSegment(item.routeKey);
              } else {
                seg = legacyHrefNorm;
              }

              if (seg === null) return null;

              const href = seg ? `/${locale}/${seg}` : `/${locale}`;

              return (
                <Link
                  key={`${label}-${index}`}
                  href={href}
                  className="text-sm font-semibold text-(--muted) hover:text-(--fg)"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          <LocaleSwitcherClient locale={locale} />
        </div>
      </div>
    </header>
  );
}
