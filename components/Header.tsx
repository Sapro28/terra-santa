import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';
import SectionsDropdownClient, {
  type SectionNavItem,
} from './sections/SectionsDropdown.client';

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

const FALLBACK_SECTION_PAGES_BY_LOCALE: Record<string, SectionNavItem[]> = {
  ar: [
    { title: 'القسم الأول', slug: 'division-1' },
    { title: 'القسم الثاني', slug: 'division-2' },
    { title: 'القسم الثالث', slug: 'division-3' },
    { title: 'القسم الرابع', slug: 'division-4' },
    { title: 'القسم الخامس', slug: 'division-5' },
    { title: 'القسم السادس', slug: 'division-6' },
    { title: 'القسم السابع', slug: 'division-7' },
  ],
  en: [
    { title: '1st Division', slug: 'division-1' },
    { title: '2nd Division', slug: 'division-2' },
    { title: '3rd Division', slug: 'division-3' },
    { title: '4th Division', slug: 'division-4' },
    { title: '5th Division', slug: 'division-5' },
    { title: '6th Division', slug: 'division-6' },
    { title: '7th Division', slug: 'division-7' },
  ],
  it: [
    { title: '1ª Divisione', slug: 'division-1' },
    { title: '2ª Divisione', slug: 'division-2' },
    { title: '3ª Divisione', slug: 'division-3' },
    { title: '4ª Divisione', slug: 'division-4' },
    { title: '5ª Divisione', slug: 'division-5' },
    { title: '6ª Divisione', slug: 'division-6' },
    { title: '7ª Divisione', slug: 'division-7' },
  ],
};

function getFallbackSectionPages(locale: string): SectionNavItem[] {
  return (
    FALLBACK_SECTION_PAGES_BY_LOCALE[locale] ??
    FALLBACK_SECTION_PAGES_BY_LOCALE.en
  );
}

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
  return raw.startsWith('/') ? raw.slice(1) : raw;
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
      title: s?.title || '',
      slug: s?.slug || '',
      order: typeof s?.order === 'number' ? s.order : 0,
    }))
    .filter((s) => s.title && s.slug)
    .sort(
      (a, b) =>
        (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title),
    )
    .map(({ title, slug }) => ({ title, slug }));

  const sectionItemsToUse =
    sectionDropdownItems.length > 0
      ? sectionDropdownItems
      : getFallbackSectionPages(locale);

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
                      className="text-sm font-semibold text-muted hover:text-(--fg)"
                    >
                      {label}
                    </a>
                  );
                }

                if (
                  item?.navType !== 'external' &&
                  item?.routeKey === 'sections'
                ) {
                  return (
                    <SectionsDropdownClient
                      key={`${label}-${index}`}
                      locale={locale}
                      label={label}
                      items={sectionItemsToUse}
                    />
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
