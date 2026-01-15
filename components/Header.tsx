'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const localeOptions = [
  { code: 'ar', label: 'AR' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
] as const;

export default function Header({ locale }: { locale: string }) {
  const t = useTranslations('Nav');
  const pathname = usePathname();

  const restPath = pathname?.replace(`/${locale}`, '')?.trim() || '/';

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

          <div className="flex items-center gap-1 rounded-xl border border-(--border) bg-white p-1">
            {localeOptions.map((opt) => {
              const target = `/${opt.code}${restPath === '' ? '/' : restPath}`;
              const active = opt.code === locale;

              return (
                <Link
                  key={opt.code}
                  href={target}
                  className={`rounded-lg px-2 py-1 text-xs font-semibold ${
                    active
                      ? 'bg-(--accent) text-white'
                      : 'text-(--muted) hover:text-(--fg)'
                  }`}
                >
                  {opt.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
