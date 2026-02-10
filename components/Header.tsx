import Link from 'next/link';
import Image from 'next/image';
import LocaleSwitcherClient from './LocaleSwitcherClient';
import HeaderNavDropdownClient, {
  type HeaderDropdownChildLink,
} from './HeaderNavDropdown.client';
import MobileNavDrawerClient, {
  type MobileNavItem,
} from './MobileNavDrawer.client';

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
  headerLogos?: Array<{ url?: string | null; alt?: string | null }> | null;
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
}: {
  locale: string;
  settings: SiteSettings | null;
  headerNav?: HeaderElement[] | null;
}) {
  const items: HeaderElement[] = headerNav ?? [];

  const logos = (settings?.headerLogos ?? []).filter(
    (l) => (l?.url ?? '').trim().length > 0,
  );
  const primaryLogo = logos[0] ?? null;
  const secondaryLogo = logos[1] ?? null;

  const mobileItems: MobileNavItem[] = items
    .map((item) => {
      const label = (item?.name ?? '').trim();
      if (!label) return null;

      const href = resolveHref(
        locale,
        item.linkType,
        item.internalPage,
        item.externalUrl,
      );

      const children = (item.childLinks ?? [])
        .map((c) => {
          const name = (c?.name ?? '').trim();
          if (!name) return null;
          const childHref = resolveHref(
            locale,
            c?.linkType,
            c?.internalPage,
            c?.externalUrl,
          );
          return { name, href: childHref };
        })
        .filter(Boolean) as Array<{ name: string; href: string | null }>;

      return {
        label,
        href,
        children: children.length ? children : undefined,
      };
    })
    .filter(Boolean) as MobileNavItem[];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2">
          {primaryLogo?.url ? (
            <Image
              src={primaryLogo.url}
              alt={primaryLogo.alt ?? settings?.schoolName ?? 'School'}
              width={40}
              height={40}
              className="h-10 w-10 rounded-sm object-contain"
              priority
            />
          ) : null}
          <span className="font-semibold text-(--fg)">
            {settings?.schoolName ?? 'School'}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <MobileNavDrawerClient
            items={mobileItems}
            localeSwitcher={<LocaleSwitcherClient locale={locale} />}
          />

          <nav className="hidden items-center gap-6 md:flex">
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
          </nav>

          <div className="hidden md:block">
            <LocaleSwitcherClient locale={locale} />
          </div>
          {secondaryLogo?.url ? (
            <Image
              src={secondaryLogo.url}
              alt={secondaryLogo.alt ?? settings?.schoolName ?? 'School'}
              width={40}
              height={40}
              className="h-10 w-10 rounded-sm object-contain"
              priority
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
