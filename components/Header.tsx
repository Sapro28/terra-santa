import Link from 'next/link';
import LocaleSwitcherClient from './LocaleSwitcherClient';

type SiteSettings = {
  schoolName?: string;
  navigation?: { href: string; label: string }[];
};

export default async function Header({
  locale,
  settings,
}: {
  locale: string;
  settings: SiteSettings | null;
}) {
  const nav = settings?.navigation ?? [
    { href: '', label: 'Home' },
    { href: 'about', label: 'About' },
    { href: 'sections', label: 'Sections' },
    { href: 'album', label: 'Album' },
    { href: 'news', label: 'News' },
    { href: 'fees', label: 'Fees' },
    { href: 'moodle', label: 'Moodle' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          {settings?.schoolName ?? 'School'}
        </Link>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 md:flex">
            {nav.map((item) => {
              const href = item.href ? `/${locale}/${item.href}` : `/${locale}`;
              return (
                <Link
                  key={item.href || 'home'}
                  href={href}
                  className="text-sm font-semibold text-(--muted) hover:text-(--fg)"
                >
                  {item.label}
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
