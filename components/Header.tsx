'use client';

import * as React from 'react';
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

export default function Header({
  locale,
  settings,
  headerNav,
}: {
  locale: string;
  settings: SiteSettings | null;
  headerNav?: HeaderElement[] | null;
}) {
  const isRtl = locale === 'ar';
  const items: HeaderElement[] = headerNav ?? [];

  const schoolName = (settings?.schoolName ?? 'School').trim();
  const nameWords = React.useMemo(
    () => schoolName.split(/\s+/).filter(Boolean),
    [schoolName],
  );

  const logos = (settings?.headerLogos ?? []).filter(
    (l) => (l?.url ?? '').trim().length > 0,
  );
  const primaryLogo = logos[0] ?? null;

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
  const [overHero, setOverHero] = React.useState(() => {
    if (typeof window === 'undefined') return true;
    return window.scrollY < 32;
  });

  React.useLayoutEffect(() => {
    const hero = document.querySelector<HTMLElement>('[data-video-hero]');
    if (!hero) {
      setOverHero(false);
      return;
    }

    const update = () => {
      setOverHero(window.scrollY < 32);
    };

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const chromeClass = overHero
    ? 'bg-transparent text-white'
    : 'bg-[#2b1b14] text-[#f5f0e8] shadow-sm';

  const linkTextClass = overHero ? 'text-white/90' : 'text-[#f5f0e8]/90';
  const brandTextClass = overHero ? 'text-white' : 'text-[#f5f0e8]';
  const underlineColor = overHero ? 'after:bg-white' : 'after:bg-[#f5f0e8]';

  const headerHeight = overHero ? '96px' : '72px';
  const logoClass = overHero
    ? 'h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-[68px] md:w-[68px]'
    : 'h-10 w-10 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12';

  const brandWrapClass = overHero
    ? 'text-base sm:text-lg md:text-xl'
    : 'text-sm sm:text-base';

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-200 ${chromeClass}`}
      style={{ height: headerHeight }}
    >
      <div className="flex h-full w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link
          href={`/${locale}`}
          className={`inline-flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}
          aria-label={schoolName || 'Home'}
        >
          {primaryLogo?.url ? (
            <Image
              src={primaryLogo.url}
              alt={primaryLogo.alt ?? schoolName ?? 'School'}
              width={96}
              height={96}
              className={logoClass}
              priority
            />
          ) : null}

          <div
            className={`${brandTextClass} ${isRtl ? 'text-right' : 'text-left'}`}
          >
            <div
              className={[
                'flex flex-col',
                isRtl ? 'items-end' : 'items-start',
                'font-semibold uppercase',
                'tracking-[0.22em]',
                'leading-[1.05]',
                brandWrapClass,
              ].join(' ')}
            >
              {(nameWords.length ? nameWords : ['School']).map((w, idx) => (
                <span key={`${w}-${idx}`}>{w}</span>
              ))}
            </div>
          </div>
        </Link>

        <div
          className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}
        >
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
                'text-sm font-semibold',
                linkTextClass,
                'after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5',
                'after:origin-left after:scale-x-0 after:transition-transform after:duration-200',
                underlineColor,
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
                  triggerClassName={ParentClassName}
                />
              );
            })}
          </nav>

          <div className="hidden md:block">
            <LocaleSwitcherClient locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
