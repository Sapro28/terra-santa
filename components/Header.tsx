import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';
import HeaderNavDropdownClient, {
  type HeaderDropdownChildLink,
} from './HeaderNavDropdown.client';
import SectionsDropdownClient, {
  type SectionNavItem,
} from './sections/SectionsDropdown.client';

type NavPageRef = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
};

type ChildLink = {
  name?: string | null;
  linkType?: 'internal' | 'external' | 'none' | null;
  internalPage?: NavPageRef | null;
  externalUrl?: string | null;
};

type HeaderElement = {
  _id?: string;
  name?: string | null;
  linkType?: 'internal' | 'external' | 'none' | null;
  internalPage?: NavPageRef | null;
  externalUrl?: string | null;
  childLinks?: ChildLink[] | null;
};

type SiteSettings = {
  schoolName?: string;
};

function resolveHref(
  locale: string,
  linkType: HeaderElement['linkType'] | ChildLink['linkType'],
  internalPage?: NavPageRef | null,
  externalUrl?: string | null,
) {
  if (linkType === 'internal') {
    const slug = (internalPage?.slug ?? '').trim();
    if (!slug) return null;
    return `/${locale}/${slug}`;
  }

  if (linkType === 'external') {
    const url = (externalUrl ?? '').trim();
    if (!url) return null;
    return url;
  }

  return null;
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || /^\/\//.test(href);
}

export default async function Header({
  locale,
  settings,
  headerNav,
  sectionPages,
}: {
  locale: string;
  settings: SiteSettings | null;
  headerNav?: HeaderElement[] | null;
  sectionPages?: Array<{
    title?: string | null;
    slug?: string | null;
    order?: number | null;
  }> | null;
}) {
  const items: HeaderElement[] = headerNav ?? [];

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
          <nav className="flex items-center gap-6">
            {items.map((item) => {
              const label = (item?.name ?? '').trim();
              if (!label) return null;

              const href = resolveHref(
                locale,
                item.linkType,
                item.internalPage,
                item.externalUrl,
              );

              const childLinks: HeaderDropdownChildLink[] = (
                item.childLinks ?? []
              )
                .map((c) => ({
                  name: (c?.name ?? '').trim(),
                  href: resolveHref(
                    locale,
                    c?.linkType,
                    c?.internalPage,
                    c?.externalUrl,
                  ),
                }))
                .filter((c) => c.name);

              const hasDropdown = childLinks.length > 0;
              const ParentClassName = [
                'relative inline-flex items-center px-1 py-2',
                'text-sm font-semibold text-muted hover:text-(--fg)',
                // underline
                'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5',
                'after:origin-left after:scale-x-0 after:bg-[#8B5A2B] after:transition-transform after:duration-200',
                'hover:after:scale-x-100',
              ].join(' ');

              const Parent =
                href && !isExternalHref(href) ? (
                  <Link href={href} className={ParentClassName}>
                    {label}
                  </Link>
                ) : href && isExternalHref(href) ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={ParentClassName}
                  >
                    {label}
                  </a>
                ) : (
                  <span className={ParentClassName}>{label}</span>
                );

              if (!hasDropdown) {
                return <div key={item._id ?? label}>{Parent}</div>;
              }

              return (
                <HeaderNavDropdownClient
                  key={item._id ?? label}
                  label={label}
                  parentHref={href}
                  childrenLinks={childLinks}
                />
              );
            })}

            {sectionDropdownItems.length ? (
              <SectionsDropdownClient
                locale={locale}
                label="Sections"
                items={sectionDropdownItems}
              />
            ) : null}
          </nav>

          <LocaleSwitcherClient locale={locale} />
        </div>
      </div>
    </header>
  );
}
