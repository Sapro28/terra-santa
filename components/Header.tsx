import { useTranslations } from 'next-intl';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';

export default function Header({
  locale,
  currentPath,
}: {
  locale: string;
  currentPath: string;
}) {
  const t = useTranslations('Nav');

  const nav = [
    { href: '', label: t('home') },
    { href: 'about', label: t('about') },
    { href: 'sections', label: t('sections') },
    { href: 'gallery', label: t('gallery') },
    { href: 'moodle', label: t('moodle') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-(--fg)">
          {t('schoolName')}
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

          <LocaleSwitcher locale={locale} currentPath={currentPath} />
        </div>
      </div>
    </header>
  );
}
